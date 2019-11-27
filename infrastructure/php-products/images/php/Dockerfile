FROM php:7.2-fpm-alpine

RUN apk update && apk add zlib-dev

RUN docker-php-ext-install mbstring tokenizer zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
