require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { errorLogger, requestLogger } = require('./middlewares/loggerHandler');

const app = express();

const {
  HOST = '127.0.0.1',
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

// Middlewares

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, HOST);
