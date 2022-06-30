const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const router = require('./routes');

const app = express();

app.set('port', process.env.PORT || 8081);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use('/drainpipes', router.drainPipe);
app.use('/rainfalls', router.rainFall);
app.use('/combinations', router.combination);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.end();
});

module.exports = app;
