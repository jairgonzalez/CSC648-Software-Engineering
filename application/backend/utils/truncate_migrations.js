import Prisma from '@prisma/client';

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();

await prisma.$executeRaw('TRUNCATE _Migration');

process.exit(0);
