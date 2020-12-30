# Migration `20201116132224-record-submitter`

This migration has been generated at 11/16/2020, 1:22:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `db`.`CovidRecord` ADD COLUMN `submitter_id` int  NOT NULL 

ALTER TABLE `db`.`FireRecord` ADD COLUMN `submitter_id` int  NOT NULL 

ALTER TABLE `db`.`CovidRecord` ADD FOREIGN KEY (`submitter_id`) REFERENCES `db`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `db`.`FireRecord` ADD FOREIGN KEY (`submitter_id`) REFERENCES `db`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201102202610-user-county..20201116132224-record-submitter
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
@@ -26,8 +26,10 @@
 model CovidRecord {
     id           Int      @default(autoincrement()) @id
     county_id    Int      //scalar field, see below
     county       County   @relation(fields: [county_id], references: [id])
+    submitter_id Int
+    submitter    User     @relation(fields: [submitter_id], references: [id])
     cases        Int?
     deaths       Int?
     icu          Int?
     hosp         Int?
@@ -42,8 +44,10 @@
     aqi          Int?
     EvacuationLevel Int?
     county_id    Int
     county       County   @relation(fields: [county_id], references: [id])
+    submitter_id Int
+    submitter    User     @relation(fields: [submitter_id], references: [id])
     area         Float?
     active       Boolean
     name         String?
     approved     Boolean  @default(false)
@@ -58,8 +62,10 @@
     phone        String   @unique
     access       String
     county_id    Int
     county       County   @relation(fields: [county_id], references: [id])
+    covidRecords CovidRecord[]
+    fireRecords  FireRecord[]
     @@index([email])
     @@index([county_id])
 }
```


