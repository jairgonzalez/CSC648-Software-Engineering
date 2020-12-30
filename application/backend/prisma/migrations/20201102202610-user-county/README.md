# Migration `20201102202610-user-county`

This migration has been generated at 11/2/2020, 8:26:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `db`.`User` ADD COLUMN `county_id` int  NOT NULL 

CREATE INDEX `User.email_index` ON `db`.`User`(`email`)

CREATE INDEX `User.county_id_index` ON `db`.`User`(`county_id`)

ALTER TABLE `db`.`User` ADD FOREIGN KEY (`county_id`) REFERENCES `db`.`County`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201102112202-approve..20201102202610-user-county
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
@@ -18,8 +18,9 @@
     latitude     Float?
     longitude    Float?
     covidRecords CovidRecord[]
     fireRecords  FireRecord[]
+    users        User[]
     @@index([name])
 }
 model CovidRecord {
@@ -55,6 +56,10 @@
     email        String   @unique
     passwordHash String
     phone        String   @unique
     access       String
+    county_id    Int
+    county       County   @relation(fields: [county_id], references: [id])
+    @@index([email])
+    @@index([county_id])
 }
```


