
const express = require('express');
const bodyParser = require('body-parser');
const mockServerData = require('./mockServerData');
const utils = require('./utils');
const generateId = require('uuid/v4');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const delayTime = 500;

// GET requests
app.get('/api/patterns', (_, res, next) => {

  setTimeout(() => res.send({ patterns: mockServerData.patterns }), delayTime);
  // next('test error')

});

app.get('/api/patterns/:patternId', (req, res, next) => {

  const patternId = req.params.patternId;
  const pattern = mockServerData.patterns.byId[patternId];

  if (pattern) {
    const patterns = {
      byId: { [patternId]: pattern },
      allIds: [patternId]
    };
    let sections = { byId: {}, allIds: [] };
    if (pattern.sectionIds) {
      sections = {
        byId: utils.filterObject(
          mockServerData.sections.byId,
          pattern.sectionIds
        ),
        allIds: pattern.sectionIds
      };
    }
    setTimeout(() => res.send({ patterns, sections }), delayTime);
  } else {
    setTimeout(
      () => res.status(404).send({ error: "pattern not found "}),
      delayTime
    );

  }
  // next('test error');

});

app.get('/api/sections/:sectionId', (req, res, next) => {

  const sectionId = req.params.sectionId;
  const section = mockServerData.sections.byId[sectionId];

  if (section) {
    const sections = {
      byId: { [section.sectionId]: section },
      allIds: [section.sectionId],
    };
    setTimeout(() => res.send({ sections }), delayTime);
  } else {
    setTimeout(
      () => res.status(404).send({ error: "section not found "}),
      delayTime
    );
  }
  // next('test error')
});


// POST requests
app.post('/api/patterns', (req, res, next) => {

  setTimeout(() => res.send({ name: generateId() }), delayTime);
  // next('test error');

});

app.post('/api/sections', (req, res, next) => {

  setTimeout(() => res.send({ name: generateId() }), delayTime);
  // next('test error');

});


// PATCH REQUESTS
app.patch('/api/sections/:sectionId', (req, res, next) => {

  let sectionUpdates = req.body;
  sectionUpdates.sectionId = req.params.sectionId;

  if (sectionUpdates.currentRow === 3) {
    next('test error');
  }
  else {
    setTimeout(() => res.send(sectionUpdates), delayTime);
    // next('test error')
  }

});

// DELETE REQUESTS
app.delete('/api/patterns/:patternId', (req, res, next) => {

  const patternId = req.params.patternId;
  const sectionIds = mockServerData.patterns.byId[patternId].sectionIds;

  setTimeout(() => res.send({ patternId, sectionIds }), delayTime);
  // next('test error');

});

app.delete('/api/sections/:sectionId', (req, res, next) => {

  const sectionId = req.params.sectionId;
  const patternId = mockServerData.sections.byId[sectionId].patternId;

  setTimeout(() => res.send({ patternId, sectionId }), delayTime);
  // next('test error');

});



app.listen(port, () => console.log(`Listening on port ${port}`));
