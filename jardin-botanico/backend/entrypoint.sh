#!/bin/bash
set -e

echo "============================================"
echo "  Jardin Botanico Virtual - Backend Init"
echo "============================================"

# Cachar configuración usando el entorno de CLI (donde están las variables de Coolify)
echo "Cachando configuracion..."
php artisan config:cache
php artisan route:cache || true
php artisan view:cache || true

# Esperar a que MySQL este disponible y ejecutar migraciones
echo "Esperando conexion a MySQL en ${DB_HOST}:${DB_PORT}..."
max_tries=30
counter=0
until php artisan migrate --force; do
    counter=$((counter + 1))
    if [ $counter -ge $max_tries ]; then
        echo "ERROR: No se pudo conectar a MySQL despues de $max_tries intentos"
        exit 1
    fi
    echo "Intento $counter/$max_tries - DB no lista, reintentando en 3s..."
    sleep 3
done

# Reparar permisos (las migraciones corriendo como root pueden crear logs de root, lo que crashea Apache)
chown -R www-data:www-data storage bootstrap/cache

echo "Migraciones completadas exitosamente!"
echo "Iniciando servidor Apache..."
exec apache2-foreground
