# Setup infrastructure
up: build run

# Build all services
build:
	docker-compose build

# Run all services
run:
	docker-compose up -d

# Test all services
test: http-api-test products-discount-test

# Service: HTTP API
http-api-test:
	@echo "";
	$(info TESTING ------- HTTP API)
	docker exec -it --user 1000 php-products_php composer test
	@echo "";
	@echo "";

# Service: PRODUCTS DISCOUNT
products-discount-test:
	@echo "";
	$(info TESTING ------- PRODUCTS DISCOUNT)
	docker exec -it --user 1000 node-products-discount npm test
	@echo "";
	@echo "";
