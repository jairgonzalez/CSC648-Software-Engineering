import Prisma from '@prisma/client';

import makeTransporter from "../utils/transporter.js";
import makeFireMail from "../utils/fireMail.js";

const {PrismaClient} = Prisma;
const prisma = new PrismaClient();

const transporter = makeTransporter();

export default async function fireAlert(record) {
  const county = await prisma.county.findOne({
    where: {
      id: record.county_id,
    },
    include: {
      users: true,
    }
  });
  const users = county.users;
  for (let user of users) {
    const message = makeFireMail(user, record);
    transporter.sendMail(message, (err, info) => {
      if(err) {
        console.log(err);
      }
    });
  }
}
