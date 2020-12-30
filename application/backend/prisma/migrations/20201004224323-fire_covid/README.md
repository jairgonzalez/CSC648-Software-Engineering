# Migration `20201004224323-fire_covid`

This migration has been generated at 10/4/2020, 10:43:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `db`.`CovidRecord` (
`id` int  NOT NULL  AUTO_INCREMENT,
`county_id` int  NOT NULL ,
`cases` int  ,
`deaths` int  ,
`icu` int  ,
`hosp` int  ,
`date` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `db`.`FireRecord` (
`id` int  NOT NULL  AUTO_INCREMENT,
`start_date` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`end_date` datetime(3)  ,
`aqi` int  ,
`EvacuationLevel` int  ,
`county_id` int  NOT NULL ,
`area` decimal(65,30)  ,
`active` boolean  NOT NULL ,
`name` varchar(191)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `db`.`CovidRecord` ADD FOREIGN KEY (`county_id`) REFERENCES `db`.`County`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `db`.`FireRecord` ADD FOREIGN KEY (`county_id`) REFERENCES `db`.`County`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200929201656-unique-name..20201004224323-fire_covid
--- datamodel.dml
+++ datamodel.dml
@@ -2,19 +2,44 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model County {
-    id         Int     @default(autoincrement()) @id
-    population Int?
-    name       String  @unique
-    area       Float?
-
+    id           Int      @default(autoincrement()) @id
+    population   Int?
+    name         String   @unique
+    area         Float?
+    covidRecords CovidRecord[]
+    fireRecords  FireRecord[]
     @@index([name])
 }
+
+model CovidRecord {
+    id           Int      @default(autoincrement()) @id
+    county_id    Int      //scalar field, see below
+    county       County   @relation(fields: [county_id], references: [id])
+    cases        Int?
+    deaths       Int?
+    icu          Int?
+    hosp         Int?
+    date         DateTime @default(now())
+}
+
+model FireRecord {
+    id           Int      @default(autoincrement()) @id
+    start_date   DateTime @default(now())
+    end_date     DateTime?
+    aqi          Int?
+    EvacuationLevel Int?
+    county_id    Int
+    county       County   @relation(fields: [county_id], references: [id])
+    area         Float?
+    active       Boolean
+    name         String?
+}
```


