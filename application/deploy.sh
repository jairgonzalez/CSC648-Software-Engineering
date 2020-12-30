#! /bin/sh

set -e
export PROJECT_ENVIRONMENT=development
export PROJECT_NGINX_CONFIG=./nginx.conf
export NODE_ENV=production
cp backend/.env.production backend/.env
cp frontend/.env.production frontend/.env
docker-compose up --build -d
