# Setup infrastructure
up: build run

# Build all services
build:
	docker-compose build

# Run all services
run:
	docker-compose up -d

# Service: php-products
php-products-shell:
	docker exec -it --user 1000 php-products_php /bin/sh
