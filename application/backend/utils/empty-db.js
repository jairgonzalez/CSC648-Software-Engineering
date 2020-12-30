import Prisma from '@prisma/client';

const {PrismaClient} = Prisma
const prisma = new PrismaClient();

console.log("Deleting users...")
const users = await prisma.user.deleteMany({});
console.log(`Deleted ${users.count} records`);

console.log("Deleting COVID/Fire Records...");

console.log("Deleting Fire Records...");
const fireRecords = await prisma.fireRecord.deleteMany({});
console.log(`Deleted ${fireRecords.count} records`);

console.log("Deleting COVID Records");
const covidRecords = await prisma.covidRecord.deleteMany({});
console.log(`Deleted ${covidRecords.count} records`);

console.log("...done");

setTimeout(process.exit(0),3000);
