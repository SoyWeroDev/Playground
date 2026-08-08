#!/bin/bash
set -e

echo "============================================"
echo "  Jardin Botanico Virtual - Backend Init"
echo "============================================"

# Limpiar cache de configuracion
php artisan config:clear 2>/dev/null || true

# Esperar a que PostgreSQL este disponible y ejecutar migraciones
echo "Esperando conexion a PostgreSQL en ${DB_HOST}:${DB_PORT}..."
max_tries=30
counter=0
until php artisan migrate --force 2>/dev/null; do
    counter=$((counter + 1))
    if [ $counter -ge $max_tries ]; then
        echo "ERROR: No se pudo conectar a PostgreSQL despues de $max_tries intentos"
        exit 1
    fi
    echo "Intento $counter/$max_tries - DB no lista, reintentando en 3s..."
    sleep 3
done

echo "Migraciones completadas exitosamente!"
echo "Iniciando servidor Apache..."
exec apache2-foreground
