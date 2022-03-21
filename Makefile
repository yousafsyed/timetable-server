COMPONENT := scheduler
CODE_CONTAINER := nodejs
APP_ROOT := /var/www/app

all: dev logs

dev:
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml up -d
	@sleep 2

command:
	@docker exec -t ${COMPONENT}_${CODE_CONTAINER}_1 $(s)

enter:
	@./ops/scripts/enter.sh ${COMPONENT} $(s)

build:
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml build

kill:
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml kill

nodev:
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml kill
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml rm -f
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml down --remove-orphans

logs:
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml logs -f $(s)

ps:
	@docker-compose -p ${COMPONENT} -f ops/docker-compose.yaml ps

up:
	docker-compose -f ops/docker-compose.yaml up -d

down:
	docker-compose -f ops/docker-compose.yaml down

nodejs:
	docker-compose -f ops/docker-compose.yaml exec nodejs sh