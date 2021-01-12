all: run-postgresql

run-postgresql: clear-paths
	cat ./.common.env > .env
	cat ./.env.postgresql >> .env
	rm -f -R data/postgres-data/* /dev/null
	docker-compose -f docker-compose.yml -f docker-compose-postgresql.yaml up --remove-orphans
run-mysql: clear-paths
	rm -f -R data/mysql-data/*
	cat ./.common.env > .env
	cat ./.env.mysql >> .env
	docker rm docker_db_1 --force
	docker-compose -f docker-compose.yml -f docker-compose-mysql.yaml up --remove-orphans
run-mssql: clear-paths
	rm -f -R data/mssql-data/*
	cat ./.common.env > .env
	cat ./.env.mssql >> .env
	docker-compose -f docker-compose.yml -f docker-compose-mssql.yaml up --remove-orphans

run-postgresql-tests: clear-paths
	cat ./.common.env > .env
	cat ./.env.postgresql >> .env
	rm -f -R data/postgres-data/* /dev/null
	docker-compose  -f docker-compose.yml -f docker-compose-postgresql.yaml -f docker-compose-test.yaml up --remove-orphans --force-recreate

run-mysql-tests: clear-paths
	rm -f -R data/mysql-data/*
	cat ./.common.env > .env
	cat ./.env.mysql >> .env
	docker-compose  -f docker-compose.yml -f docker-compose-mysql.yaml -f docker-compose-test.yaml up --remove-orphans --force-recreate

run-mssql-tests: clear-paths
	rm -f -R data/mssql-data/*
	cat ./.common.env > .env
	cat ./.env.mssql >> .env
	docker-compose  -f docker-compose.yml -f docker-compose-mssql.yaml -f docker-compose-test.yaml up --remove-orphans --force-recreate


clear-paths:
	rm -f ./.env

clear-db:
	docker rmi docker_db --force
