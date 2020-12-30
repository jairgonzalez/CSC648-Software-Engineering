# Migration `20200929201656-unique-name`

This migration has been generated at 9/29/2020, 8:16:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX `County.name_unique` ON `db`.`County`(`name`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200924225030-init..20200929201656-unique-name
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
@@ -12,9 +12,9 @@
 model County {
     id         Int     @default(autoincrement()) @id
     population Int?
-    name       String
+    name       String  @unique
     area       Float?
     @@index([name])
 }
```


