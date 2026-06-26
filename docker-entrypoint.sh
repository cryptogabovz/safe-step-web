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
echo "Seeding about/contact pages..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -d "$DB_NAME" < /app/safestep-about-contact.sql
echo "Seed complete."

# Create admin user if ADMIN_EMAIL and ADMIN_PASSWORD are set (idempotent — skips if email exists)
if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
  echo "Creating admin user if not exists..."
  node -e "
function tryRequire() {
  for (var i = 0; i < arguments.length; i++) {
    try { return require(arguments[i]); } catch(e) {}
  }
  throw new Error('Module not found in any of: ' + Array.from(arguments).join(', '));
}
var pg     = tryRequire('/app/node_modules/pg', '/app/packages/evershop/node_modules/pg');
var bcrypt = tryRequire('/app/node_modules/bcryptjs', '/app/packages/evershop/node_modules/bcryptjs');
var Pool   = pg.Pool;

var pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function run() {
  var hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(10));
  var name = process.env.ADMIN_NAME || 'Administrador';
  await pool.query(
    'INSERT INTO admin_user (email, password, full_name, status) VALUES (\$1, \$2, \$3, true) ON CONFLICT (email) DO NOTHING',
    [process.env.ADMIN_EMAIL, hash, name]
  );
  await pool.end();
  console.log('Admin user ready: ' + process.env.ADMIN_EMAIL);
}

run().catch(function(e) { console.error('Admin create error:', e.message); process.exit(0); });
" || echo "Warning: admin user creation skipped"
fi

wait $APP_PID
