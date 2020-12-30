import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));

//dotenv.config();

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import countiesRouter from './routes/counties.js';
import recordsRouter from './routes/records.js';
import adminRouter from './routes/admin.js';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dream Team Express API",
      version: "0.1.0",
      description:
          "COVID App Swagger Documentation",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Dream Team",
        url: "https://sfsucsc648.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
  },
  apis: ["./swagger/swagger.yaml"],
};

const specs = swaggerJSdoc(swaggerOptions);

app.use(cors({
  origin: '*',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  credentials: true,
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/counties', countiesRouter);
app.use('/records/', recordsRouter);
app.use('/admin/', adminRouter);

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(specs)
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
