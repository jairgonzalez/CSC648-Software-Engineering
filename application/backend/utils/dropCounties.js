import Prisma from '@prisma/client';

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();

console.log("Deleting counties database...");
const counties = await prisma.county.deleteMany({});
console.log(`Deleted ${counties.count} counties`);

setTimeout(() => process.exit(), 5000);
