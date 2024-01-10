build:
	docker-compose build

up:
	docker-compose up -d --build

down:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d

logs:
	docker-compose logs -f

.PHONY: build up down restart logs
