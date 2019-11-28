# Setup infrastructure
up: build run

# Build all services
build: php-products-build

# Run all services
run: php-products-run

# Service: php-products
php-products-build:
	docker-compose -f ./php-products/docker-compose.yaml build
php-products-run:
	docker-compose -f ./php-products/docker-compose.yaml up -d
php-products-shell:
	docker exec -it --user 1000 php-products_php /bin/sh
