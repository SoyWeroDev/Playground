# ═══════════════════════════════════════════════════════════
# Stage 1: Build del Frontend React
# ═══════════════════════════════════════════════════════════
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Instalar dependencias
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Copiar codigo fuente y compilar
COPY frontend/ .
RUN npm run build
# Output: /app/dist/

# ═══════════════════════════════════════════════════════════
# Stage 2: PHP 8.3 + Apache (produccion)
# ═══════════════════════════════════════════════════════════
FROM php:8.3-apache

# Dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    curl \
    && docker-php-ext-install pdo_mysql \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copiar backend
COPY backend/ backend/

# Copiar build de React dentro de public/
COPY --from=frontend-builder /app/dist/assets backend/public/assets/
COPY --from=frontend-builder /app/dist/index.html backend/public/spa.html

# Configurar Apache: DocumentRoot apunta a backend/public/
ENV APACHE_DOCUMENT_ROOT=/var/www/html/backend/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Habilitar .htaccess
RUN sed -i 's|AllowOverride None|AllowOverride All|g' /etc/apache2/apache2.conf

# Asegurar permisos de lectura en la carpeta public
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
