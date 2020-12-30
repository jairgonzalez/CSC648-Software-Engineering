#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "You must enter exactly one argument for the migration name"
else
  docker-compose exec backend npx prisma migrate save --name "$1" --experimental
fi
