# ═══════════════════════════════════════════════════════════
# Stage 1: Build del Frontend React + Tailwind
# ═══════════════════════════════════════════════════════════
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Instalar dependencias
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copiar codigo fuente y compilar
COPY frontend/ .
RUN npm run build
# Output: /app/dist/

# ═══════════════════════════════════════════════════════════
# Stage 2: PHP 8.3 + Apache + Laravel + React (produccion)
# ═══════════════════════════════════════════════════════════
FROM php:8.3-apache

# Dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev \
    && docker-php-ext-install pdo_mysql zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Crear proyecto Laravel fresco
RUN composer create-project laravel/laravel . --prefer-dist --no-interaction --no-scripts

# IMPORTANTE: Eliminar el .env auto-generado (tiene DB_CONNECTION=sqlite por defecto)
# Laravel usara las variables de entorno del sistema inyectadas por Coolify
RUN rm -f .env

# Sobrescribir con archivos personalizados del proyecto
COPY backend/bootstrap/app.php bootstrap/app.php
COPY backend/routes/api.php routes/api.php
COPY backend/app/Models/Planta.php app/Models/Planta.php
COPY backend/app/Http/Controllers/PlantaController.php app/Http/Controllers/PlantaController.php
COPY backend/database/migrations/2026_08_08_000001_create_plantas_table.php \
     database/migrations/2026_08_08_000001_create_plantas_table.php

# Copiar build de React dentro de public/ de Laravel
COPY --from=frontend-builder /app/dist/assets public/assets/
COPY --from=frontend-builder /app/dist/index.html public/spa.html

# Agregar ruta catch-all en Laravel para servir el SPA de React
# Todas las rutas que no sean /api/* devuelven el index de React
RUN printf "<?php\n\nuse Illuminate\Support\Facades\Route;\n\n// Catch-all: sirve la SPA de React para rutas no-API\nRoute::get('/{any}', function () {\n    return response()->file(public_path('spa.html'));\n})->where('any', '.*');\n" > routes/web.php

# Configurar Apache: DocumentRoot apunta a public/
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Habilitar .htaccess para el routing de Laravel
RUN sed -i 's|AllowOverride None|AllowOverride All|g' /etc/apache2/apache2.conf

# Asegurar permisos de lectura en la carpeta public
RUN chmod -R 755 public

# Permisos de Laravel
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Entrypoint: espera DB, migra, inicia Apache
COPY backend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]
