import express from 'express';
import Prisma from '@prisma/client';

const router = express.Router();

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();

router.get('/:id', async function(req,res,next) {
    let id = parseInt(req.params.id);
    if(isNaN(id)){
        res.sendStatus(404);
    }
    let recordType = req.query.type ? req.query.type : 'all';
    let county = await prisma.county.findOne({
        where: {
            id: id,
        },
        include: {
            covidRecords: /covid|all/i.test(recordType),
            fireRecords: /fire|all/i.test(recordType),
        },
    });
    if(county) {
        res.json(county);
    } else {
        res.sendStatus(404);
    }
});

router.post('/covid-display', async function(req,res,next) {
  let id = parseInt(req.body.countyId);
  let sortDataBy = req.body.sortBy
  let orderDataBy = req.body.orderBy
  if(isNaN(id)){
      res.sendStatus(404);
  }
  
  let county = await prisma.covidRecord.findMany({
    take : req.body.limit,
    where: {
       county_id : id,
        date: {
          gte: req.body.startDate,
          lte: req.body.endDate
        }
    },  
    orderBy: {
       [sortDataBy] : orderDataBy
    }
  });
  if(county) {
      res.json(county);
  } else {
      res.sendStatus(404);
  }
});
router.post('/fire-display', async function(req,res,next) {
  let id = parseInt(req.body.countyId);
  let sortDataBy = req.body.sortBy
  let orderDataBy = req.body.orderBy
  if(isNaN(id)){
      res.sendStatus(404);
  }
  
  let county = await prisma.fireRecord.findMany({
    take : req.body.limit,
    where: {
       county_id : id,
        start_date: {
          gte: req.body.startDate,
          lte: req.body.endDate
        }
    },  
    orderBy: {
       [sortDataBy] : orderDataBy
    }
  });
  if(county) {
      res.json(county);
  } else {
      res.sendStatus(404);
  }
});

router.get('/', async function(req, res, next) {
    let query = req.query;
    let queryObj = {};
    if(query.name){
        queryObj = {
            where: {
                name: {
                    contains: query.name
                }
            },
            include: {
                covidRecords: /covid|all/i.test(query.type),
                fireRecords:/fire|all/i.test(query.type)
            }
        };
    } else {
        queryObj = {
            include: {
                covidRecords: /covid|all/i.test(query.type),
                fireRecords:/fire|all/i.test(query.type)
            }
        };

    }
    const records = await prisma.county.findMany(queryObj);
    res.json(records);
});

export default router;
