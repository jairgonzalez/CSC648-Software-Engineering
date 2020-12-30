# Backend Folder

## Purpose
The purpose of this folder is to store all the source code and related files for your team's application. Source code MUST NOT be in any of folder. <strong>YOU HAVE BEEN WARNED</strong>

You are free to organize the contents of the folder as you see fit. But remember your team is graded on how you use Git. This does include the structure of your application. Points will be deducted from poorly structured application folders.

## Please use the rest of the README.md to store important information for your team's application.

To launch the app locally, use

```docker-compose up -d```

You can check logs inside a container using ```logs``` as so:

```docker-compose logs backend```

or

```docker-compose logs db```

To deploy the app inside the server, use ```deploy.sh```  .  

After pulling significant changes, particularly to dockerfiles,
you may need to order Docker to rebuild your containers. To do this,
use  

```docker-compose build```.  

## Prisma/Database

This backend uses [prisma](https://www.prisma.io/docs/) to communicate with the database.

It uses models located in backend/prisma/schema.prisma to produce the tables in the database.  

If you change or add a model, to update the database, use the script: ```backend/scripts/migrate.sh``` followed by
a name for your migration. For example:  

```./migrate.sh User```

would create a migration named User.

By default, launching the app uses the most updated database migration.  

Right now, the backend also runs a few tests on the database on launch. Be sure
to check that these tests pass.
