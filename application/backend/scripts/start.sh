#! /bin/sh

set -e
# upgrade to most recent migration
npx prisma migrate up --auto-approve --experimental
# update generator
npx prisma generate
# run tests
npm test
# start the backend
npm start
