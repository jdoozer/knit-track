const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');

const patternsRouter = require('./routes/patterns');
const sectionsRouter = require('./routes/sections');

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const production = (process.env.NODE_ENV === 'production');


// Initialize database app, using service account if running locally
if (production) {
  admin.initializeApp(functions.config().firebase);
} else {
  const serviceAccount = require(
    './../../../keys/knit-track-8aef8cbb1d1d.json'
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://knit-track.firebaseio.com"
  });
}
const db = admin.database();

// Not exactly sure why I need this? but it works...
const path = production ? '' : '/api';

// Routes
app.use(`${path}/patterns`, patternsRouter(db));
app.use(`${path}/sections`, sectionsRouter(db));

// Catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404)) });

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error })
});

exports.api = functions.https.onRequest(app);
