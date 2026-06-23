#!/usr/bin/env bash
# ============================================================
# Safe Step — Copia de imágenes de marca al directorio media
# ============================================================
# Uso:
#   bash setup-safestep-media.sh <ruta_de_tu_app_evershop>
#
# Ejemplo:
#   bash setup-safestep-media.sh /home/usuario/mi-tienda
#
# Si no se pasa argumento, intenta usar el directorio actual.
# ============================================================

set -e

APP_ROOT="${1:-.}"

if [ ! -d "$APP_ROOT" ]; then
  echo "Error: El directorio '$APP_ROOT' no existe."
  exit 1
fi

MEDIA_DIR="$APP_ROOT/media/safestep"
mkdir -p "$MEDIA_DIR"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/seed/images/safestep"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: No se encontró el directorio de imágenes: $SOURCE_DIR"
  echo "Asegúrate de que las imágenes de marca estén en seed/images/safestep/"
  exit 1
fi

echo "Copiando imágenes de Safe Step a: $MEDIA_DIR"
cp -v "$SOURCE_DIR"/*.png "$MEDIA_DIR/" 2>/dev/null || true
cp -v "$SOURCE_DIR"/*.jpg "$MEDIA_DIR/" 2>/dev/null || true

echo ""
echo "✓ Imágenes copiadas correctamente."
echo ""
echo "Rutas disponibles en la tienda:"
for f in "$MEDIA_DIR"/*; do
  filename=$(basename "$f")
  echo "  /media/safestep/$filename"
done

echo ""
echo "Siguiente paso:"
echo "  psql -U <usuario> -d <base_de_datos> -f safestep-homepage-seed.sql"
