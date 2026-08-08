FROM php:8.3-apache

# Instalar dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev \
    && docker-php-ext-install pdo_mysql zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Crear proyecto Laravel fresco
RUN composer create-project laravel/laravel . --prefer-dist --no-interaction

# Sobrescribir con archivos personalizados del proyecto
COPY app/Http/Controllers/PlantaController.php app/Http/Controllers/PlantaController.php
COPY app/Models/Planta.php app/Models/Planta.php
COPY database/migrations/2026_08_08_000001_create_plantas_table.php database/migrations/2026_08_08_000001_create_plantas_table.php
COPY routes/api.php routes/api.php
COPY bootstrap/app.php bootstrap/app.php

# Configurar Apache DocumentRoot al directorio public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Habilitar AllowOverride para .htaccess de Laravel
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

# Permisos para storage y cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copiar y preparar entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]
