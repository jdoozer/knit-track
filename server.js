const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');

const patternsRouter = require('./routes/patterns');
const sectionsRouter = require('./routes/sections');

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());

app.use('/api/patterns', patternsRouter);
app.use('/api/sections', sectionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404)) });

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
