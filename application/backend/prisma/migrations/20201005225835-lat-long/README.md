# Migration `20201005225835-lat-long`

This migration has been generated at 10/5/2020, 10:58:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `db`.`County` ADD COLUMN `latitude` decimal(65,30)  ,
ADD COLUMN `longitude` decimal(65,30)  
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201004224323-fire_covid..20201005225835-lat-long
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
@@ -14,8 +14,10 @@
     id           Int      @default(autoincrement()) @id
     population   Int?
     name         String   @unique
     area         Float?
+    latitude     Float?
+    longitude    Float?
     covidRecords CovidRecord[]
     fireRecords  FireRecord[]
     @@index([name])
 }
```


