FROM php:7.2-fpm-alpine

# Packages registry & PHP Extensions
RUN apk update && \
    # APK
    apk add build-base gcc zlib-dev pcre-dev autoconf libc6-compat && \
    apk add curl-dev openssl-dev pkgconfig && \
    # PECL
    pecl install mongodb grpc protobuf && \
    # DOCKER-PHP-EXT
    docker-php-ext-install mbstring tokenizer zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
