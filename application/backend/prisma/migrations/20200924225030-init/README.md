# Migration `20200924225030-init`

This migration has been generated at 9/24/2020, 10:50:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `db`.`County` (
`id` int  NOT NULL  AUTO_INCREMENT,
`population` int  ,
`name` varchar(191)  NOT NULL ,
`area` decimal(65,30)  ,
Index `County.name_index`(`name`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200924225030-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,20 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model County {
+    id         Int     @default(autoincrement()) @id
+    population Int?
+    name       String
+    area       Float?
+
+    @@index([name])
+}
```


