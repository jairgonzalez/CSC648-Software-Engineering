import express from 'express';
import Prisma from '@prisma/client';
import verifyJWT from "../utils/verifyJWT.js";

const router = express.Router();

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();

router.use(verifyJWT);

router.get('/', function (req,res,next) {
  res.send('This is a protected endpoint');
})

router.post('/covid/', async function(req, res, next) {
  if(req.token?.access !== 'admin' && req.token?.access !== 'employee'){
    console.log("Rejecting with token as");
    console.log(req.token);
    res.sendStatus(403);
    return;
  }
  console.log(req.body);
  const {
    county,
    deaths,
    icu,
    hosp,
    cases,
    date,
  } = req.body;
  const dateObj = new Date(date);
  try {
    const countyDb = await prisma.county.findOne({
      where: {
        name: county,
      }
    });
    if(!countyDb) {
      res.status(422).send("Could not find that county");
      return;
    }
    const record = await prisma.covidRecord.create({
      data: {
        county: {
          connect: {
            id: countyDb.id,
          }
        },
        submitter: {
          connect: {
            email: req.token.sub,
          }
        },
        date: dateObj,
        deaths,
        icu,
        hosp,
        cases,
      }
    });
    if(!record){
      res.sendStatus(422);
      return;
    }
  } catch(err) {
    console.log(err);
    res.status(422).send(err);
    return;
  }
  res.sendStatus(201);
});

router.post('/fire/', async function(req, res, next){
  if(req.token?.access !== 'admin' && req.token?.access !== 'employee'){
    res.sendStatus(403);
  }
  const {
    start_date,
    end_date,
    aqi,
    EvacuationLevel,
    county,
    area,
    active,
    name,
  } = req.body;
  const countyDb = await prisma.county.findOne({
    where: {
      name: county,
    }
  });
  if(!countyDb) {
    res.status(422).send("Could not find that county");
    return;
  }
  const record = await prisma.fireRecord.create({
    data: {
      county: {
        connect: {
          id: countyDb.id,
        }
      },
      submitter: {
        connect: {
          email: req.token.sub,
        }
      },
      start_date,
      end_date,
      aqi,
      EvacuationLevel,
      area,
      active,
      name,
    }
  });
  if(!record){
    res.sendStatus(422);
    return;
  }
  res.sendStatus(201);
});

router.get('/submitted/', async function(req, res, next) {
  if(req.token?.access !== 'admin' && req.token?.access !== 'employee'){
    console.log("Rejecting request to /submitted/ with token as");
    console.log(req.token);
    res.sendStatus(403);
    return;
  }
  try {
    const covidRecords = await prisma.covidRecord.findMany({
      where: {
        submitter: {
          email: req.token.sub,
        },
        approved: false,
      },
      include: {
        county: true,
      },
    });
    const fireRecords = await prisma.fireRecord.findMany({
      where: {
        submitter: {
          email: req.token.sub,
        },
        approved: false,
      },
      include: {
        county: true,
      },
    });
    const returnObj = {
      covidRecords,
      fireRecords,
    };
    return res.json(returnObj);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
});

export default router;
