#!/bin/bash

COMPOSE="/usr/bin/docker-compose --ansi never"
DOCKER="/usr/bin/docker"

cd /home/sammy/node_project/
$COMPOSE run certbot renew --dry-run && $COMPOSE kill -s SIGHUP proxy
$DOCKER system prune -af