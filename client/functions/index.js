
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');

const patternsRouter = require('./routes/patterns');
const sectionsRouter = require('./routes/sections');


admin.initializeApp(functions.config().firebase);

const app = express();
app.use(express.json());

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Routes
app.use('/patterns', patternsRouter);
app.use('/sections', sectionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404)) });

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error })
});

exports.api = functions.https.onRequest(app);
