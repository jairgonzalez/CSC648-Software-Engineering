import express from 'express'
import Prisma from '@prisma/client';

import verifyJWT from "../utils/verifyJWT.js";
import makeTransporter from "../utils/transporter.js";
import settings from "../settings.js";
import makeCovidMail from "../utils/covidMail.js";
import makeFireMail from "../utils/fireMail.js";
import covidAlert from "../utils/covidAlert.js";
import fireAlert from "../utils/fireAlert.js";

const router = express.Router();

const {PrismaClient} = Prisma;
const prisma = new PrismaClient();

const transporter = makeTransporter();

function verifyAdmin(req, res, next) {
  if(req.token?.access !== 'admin') {
    res.sendStatus(403);
    return;
  }
  next();
}

router.use(verifyJWT);

router.get('/testEmail/', verifyAdmin, function (req, res, next) {
  const message = {
    from: 'alerts@sfsucsc648.com',
    to: 'alerts@sfsucsc648.com',
    subject: 'Testing SES Email',
    text: 'This is a simple test',
    html: '<p>This is a simple test</p>'
  }

  transporter.sendMail(message, (err, info) => {
    console.log('Err: ');
    console.log(err);
    console.log('Info: ');
    console.log(info);
  });

  res.status(200).send('Test email sent');
});

router.get('/covid/verify/', verifyAdmin, async function activateRecord(req, res, next) {
  const id = parseInt(req.query?.id);
  if(isNaN(id)) {
    res.status(422).send('There is no record id');
  }
  try {
    const record = await prisma.covidRecord.findOne({
      where: {
        id
      },
      include: {
        county: true,
      }
    });

    const count = await prisma.covidRecord.update({
      where: {
        id
      },
      data: {
        approved: true,
      },
      include: {
        county: true,
      }
    });
    if(!count) {
      return res.status(422).send('No such record could be fine');
    }
    res.sendStatus(200);
    // Check to see if we should send emails
    if(settings.alertsEnabled && record.cases / record.county.population >= settings.covidAlertRatio) {
      covidAlert(record).catch(err => console.log(err));
    }
  } catch(err) {
    res.status(422).send('No such record could be found');
  }
});

router.get('/covid/verifyall/', verifyAdmin, async function activateRecord(req, res, next) {
  try {
    const records = await prisma.covidRecord.findMany({
      where: {
        approved: false,
      },
      include: {
        county: true,
      },
    });
    const count = await prisma.covidRecord.updateMany({
      where: {
        approved: false,
      },
      data: {
        approved: true,
      }
    });
    if(!count) {
      console.log('No count for count:');
      console.log(count);
      return res.status(422).send('No such records could be found');
    }
    res.sendStatus(200);
    if(settings.alertsEnabled) {
      records.forEach((record) => {
        if(record.cases / record.county.population >= settings.covidAlertRatio) {
          console.log('Alerting:');
          console.log(record);
          covidAlert(record).catch(err => console.log(err));
        }
      });
    }
  } catch(err) {
    console.log(err);
    res.status(422).send('No such record could be found');
  }
});

router.get('/fire/verify/', verifyAdmin, async function activateRecord(req, res, next) {
  const id = parseInt(req.query?.id);
  if(isNaN(id)) {
    res.status(422).send('There is no record id');
  }
  try {
    const record = await prisma.covidRecord.update({
      where: {
        id
      },
      data: {
        approved: true,
      },
    });
    if(!record) {
      res.status(422).send('No such record could be found');
    }
    res.sendStatus(200);
    if(settings.alertsEnabled && record.EvacuationLevel >= settings.fireAlertLevel) {
      fireAlert(record).catch(err => console.log(err));
    }
  } catch(err) {
    return res.status(422).send('No such record could be fine');
  }
});

router.get('/fire/verifyall/', verifyAdmin, async function activateRecord(req, res, next) {
  try {
    const records = await prisma.fireRecord.findMany({
      where: {
        approved: false,
      }
    });
    const count = await prisma.fireRecord.updateMany({
      where: {
        approved: false,
      },
      data: {
        approved: true,
      }
    });
    if(!count) {
      return res.status(422).send('No such record could be fine');
    }
    res.sendStatus(200);
    if(settings.alertsEnabled) {
      records.forEach((record) => {
        if(record.EvacuationLevel >= settings.fireAlertLevel) {
          fireAlert(record).catch(err => console.log(err));
        }
      });
    }
  } catch(err) {
    res.status(422).send('No such record could be fine');
  }
});

router.get('/users/', verifyAdmin, async function(req, res, next) {
  const countyId = parseInt(req.query?.id);
  if(isNaN(countyId)) {
    res.status(422).send('There is no such county');
    return;
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        county_id: countyId,
      },
      orderBy: {
        email: 'desc'
      },
    });
    return res.json(users);
  } catch(err) {
    console.log(err);
    res.status(422).send(err);
  }
});

router.delete('/users/delete/', verifyAdmin, async function(req, res, next) {
  const userId = parseInt(router.query?.id);
  if(isNaN(userId)) {
    res.status(422).send('There is no valid user id');
  }
  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      }
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

export default router;
