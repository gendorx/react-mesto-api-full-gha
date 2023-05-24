const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { errorLogger, requestLogger } = require('./middlewares/loggerHandler');

const { HOST, PORT, DATABASE_URL } = require('./utils/config');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, HOST);
