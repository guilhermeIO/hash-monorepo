FROM php:7.2-fpm-alpine

# Packages registry & PHP Extensions
RUN apk update && \
    # APK
    apk add build-base gcc zlib-dev pcre-dev autoconf && \
    # PECL
    pecl install mongodb

RUN docker-php-ext-install mbstring tokenizer zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
