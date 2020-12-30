# Migration `20201018221901-init-user`

This migration has been generated at 10/18/2020, 10:19:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `db`.`User` (
`id` int  NOT NULL  AUTO_INCREMENT,
`firstName` varchar(191)  NOT NULL ,
`lastName` varchar(191)  NOT NULL ,
`email` varchar(191)  NOT NULL ,
`passwordHash` varchar(191)  NOT NULL ,
`phone` varchar(191)  NOT NULL ,
`access` varchar(191)  NOT NULL ,
UNIQUE Index `User.email_unique`(`email`),
UNIQUE Index `User.phone_unique`(`phone`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201005225835-lat-long..20201018221901-init-user
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -44,4 +44,14 @@
     area         Float?
     active       Boolean
     name         String?
 }
+
+model User {
+    id           Int      @default(autoincrement()) @id
+    firstName    String
+    lastName     String
+    email        String   @unique
+    passwordHash String
+    phone        String   @unique
+    access       String
+}
```


