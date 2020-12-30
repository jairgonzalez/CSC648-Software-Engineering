import express from 'express'
import Prisma from '@prisma/client';
import bcrypt from 'bcrypt';

const {PrismaClient} = Prisma;
const prisma = new PrismaClient();

export async function makeAdminAccount(admin) {
  const oldUser = await prisma.user.findOne({
    where: {
      email: admin.email,
    }
  });
  if(oldUser){
    console.log('That email is already registered');
    return;
  }

  const saltRounds = 12;

  let newUser;

  bcrypt.hash(admin.password, saltRounds, async (err, hash) => {
    const {firstName,lastName,email,phone, county} = admin;
    newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        passwordHash: hash,
        access: 'admin',
        county: {
          connect: {
            name: county,
          },
        },
      },
    });
    console.log(newUser);
    if(!newUser) {
      console.log("Failed to create user: ");
      console.log("Usage: [email] [password] [firstName] [lastName] [phone] [county]");
      console.log('Example: admin@admin.com mypassword John Smith 5554495218 "San Mateo County"');
    }
  });
}

async function makeAdminFromArgs() {
  const args = process.argv.slice(2);
  try {
    const admin = {
      email: args[0],
      password: args[1],
      firstName: args[2],
      lastName: args[3],
      phone: args[4],
      county: args[5],
    };
    await makeAdminAccount(admin);
  } catch (err) {
    console.log(err);
    console.log("Usage: [email] [password] [firstName] [lastName] [phone] [county]");
    console.log('Example: admin@admin.com mypassword John Smith 5554495218 "San Mateo County"');
  }
  setTimeout(() => process.exit(0), 3000);
}

await makeAdminFromArgs();
