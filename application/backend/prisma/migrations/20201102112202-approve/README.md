# Migration `20201102112202-approve`

This migration has been generated at 11/2/2020, 11:22:03 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `db`.`CovidRecord` ADD COLUMN `approved` boolean  NOT NULL DEFAULT false

ALTER TABLE `db`.`FireRecord` ADD COLUMN `approved` boolean  NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201018221901-init-user..20201102112202-approve
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
@@ -30,8 +30,9 @@
     deaths       Int?
     icu          Int?
     hosp         Int?
     date         DateTime @default(now())
+    approved     Boolean  @default(false)
 }
 model FireRecord {
     id           Int      @default(autoincrement()) @id
@@ -43,8 +44,9 @@
     county       County   @relation(fields: [county_id], references: [id])
     area         Float?
     active       Boolean
     name         String?
+    approved     Boolean  @default(false)
 }
 model User {
     id           Int      @default(autoincrement()) @id
@@ -54,4 +56,5 @@
     passwordHash String
     phone        String   @unique
     access       String
 }
+
```


