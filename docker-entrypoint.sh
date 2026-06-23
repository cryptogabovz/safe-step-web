#!/bin/sh
set -e

# Copy seed images into the media volume
echo "Copying seed media to volume..."
mkdir -p /app/media/safestep
cp -r /app/seed-media/safestep/. /app/media/safestep/
echo "Media copy done: $(ls /app/media/safestep/ | wc -l) files"

echo "Waiting for database..."
until PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  sleep 2
done
echo "Database ready."

# Start app in background so migrations run and create tables
npm run start &
APP_PID=$!

# Wait for widget_instance table to exist (created by migrations)
echo "Waiting for EverShop migrations..."
RETRIES=60
while [ $RETRIES -gt 0 ]; do
  TABLE=$(PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT to_regclass('public.widget_instance')" 2>/dev/null | tr -d ' \n' || echo "")
  if [ "$TABLE" = "widget_instance" ]; then
    break
  fi
  sleep 5
  RETRIES=$((RETRIES - 1))
done

# Seed SafeStep widgets (SQL is idempotent — deletes own rows before inserting)
echo "Seeding homepage widgets..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -d "$DB_NAME" < /app/safestep-homepage-seed-v2.sql
echo "Seeding legal pages..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -d "$DB_NAME" < /app/safestep-legal-pages.sql
echo "Seed complete."

wait $APP_PID
