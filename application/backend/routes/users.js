import express from 'express'
import Prisma from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import makeAccessJWT from "../utils/makeAccessJWT.js";
import makeRefreshToken from "../utils/makeRefreshToken.js"
import verifyJWT from "../utils/verifyJWT.js";

const router = express.Router();

const {PrismaClient} = Prisma;
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register/', async function (req,res,next) {
  console.log("Received request:");
  console.log(req.body);
  const {firstName, lastName, email, password, phone, county} = req.body;
  console.log("Email parsed as:");
  console.log(email);
  const oldUser = await prisma.user.findOne({
    where: {
      email: email,
    }
  });
  if(oldUser){
    res.status(422).send('That email is already registered');
  }

  const saltRounds = 12;

  let newUser;
  try{
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      newUser = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash: hash,
          phone: phone,
          access: 'standard',
          county: {
            connect: {
              name: county,
            },
          },
        },
      });
    });
  } catch(err){
    res.sendStatus(422);
  }

  res.sendStatus(201);
});

router.post('/login/', async function(req, res, next) {
  console.log("Received request:")
  console.log(req.body)
  const {email, password} = req.body;
  const user = await prisma.user.findOne({
    where: {
      email: email,
    }
  });
  console.log("Found user as:")
  console.log(user);
  if(!user){
    res.status(422).send('There is no user with that email');
    return;
  }
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if(err || !result){
      console.log(err ? err : result);
      res.sendStatus(401);
      return;
    }
    const accessToken = makeAccessJWT(user);
    const refreshToken = makeRefreshToken(user);
    const payload = {
      token_type: 'bearer',
      access_token: accessToken,
      refresh_token: 'Refresh token is in the cookie as HTTPOnly',
      role: user.access,
      email: user.email,
    }
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 365,
      path: '/api/users/refresh/'
    });
    return res.json(payload);
  });
});

router.post('/refresh/', async function(req, res, next) {
  const token = req.cookies.refresh_token;
  console.log("Received refresh token as:");
  console.log(token);
  if(token === undefined){
    res.sendStatus(401);
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if(err){
      return res.status(400).send(err);
    }
    if(!decodedToken){
      return res.sendStatus(401);
    }
    const user = await prisma.user.findOne({
      where: {
        email: decodedToken.sub,
      },
    });
    if(!user) {
      return res.status(400).send(err);
    }
    const payload = {
      access_token: makeAccessJWT(user),
      token_type: 'Bearer',
    }
    return res.json(payload);
  });
});

router.post('/employee/register/', verifyJWT, async function (req, res, next) {
  if(req.token?.access !== 'admin') {
    res.sendStatus(403);
    return;
  }
  console.log("Received request:");
  console.log(req.body);
  const {firstName, lastName, email, password, phone, county} = req.body;
  console.log("Email parsed as:");
  console.log(email);
  const oldUser = await prisma.user.findOne({
    where: {
      email: email,
    }
  });
  if(oldUser){
    res.status(422).send('That email is already registered');
  }

  const saltRounds = 12;

  let newUser;
  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      newUser = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash: hash,
          phone: phone,
          access: 'employee',
          county: {
            connect: {
              name: county,
            },
          },
        },
      });
      if(!newUser) {
        res.sendStatus(422);
      }
    });
  } catch(err){
    res.sendStatus(422);
    return;
  }
  res.sendStatus(201);
});

router.get('/employee/covid/delete/', verifyJWT, async function(req, res, next) {
  if(req.token?.access !== 'admin' && req?.token.access !== 'employee') {
    res.sendStatus(403);
    return;
  }
  const recordId = parseInt(req.query?.id);
  if(isNaN(recordId)){
    res.sendStatus(422);
    return;
  }
  try {
    const record = await prisma.covidRecord.findOne({
      where: {
        id: recordId,
      },
      include: {
        submitter: true,
      }
    });
    if(record) {
      if(record.submitter.email !== req.token?.sub) {
        res.sendStatus(403);
        return;
      }
      await prisma.covidRecord.delete({
        where: {
          id: recordId,
        }
      });
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

router.get('/employee/fire/delete/', verifyJWT, async function(req, res, next) {
  if(req.token?.access !== 'admin' && req?.token.access !== 'employee') {
    res.sendStatus(403);
    return;
  }
  const recordId = parseInt(req.query?.id);
  if(isNaN(recordId)){
    res.sendStatus(422);
    return;
  }
  try {
    const record = await prisma.fireRecord.findOne({
      where: {
        id: recordId,
      },
      include: {
        submitter: true,
      }
    });
    if(record) {
      if(record.submitter.email !== req.token?.sub) {
        res.sendStatus(403);
        return;
      }
      await prisma.fireRecord.delete({
        where: {
          id: recordId,
        }
      });
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

export default router;
