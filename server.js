
const express = require('express');
const bodyParser = require('body-parser');
const mockServerData = require('./mockServerData');
const utils = require('./utils');
const generateId = require('uuid/v4');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/api/patterns', (req, res, next) => {

  // res.send({ patterns: mockServerData.patterns });
  setTimeout(() => res.send({ patterns: mockServerData.patterns }), 200);
  // next('test error')

});

app.post('/api/patterns', (req, res) => {

  const patternId = generateId();
  let pattern = req.body.pattern;
  pattern.patternId = patternId;
  pattern.sectionIds = [];

  res.send({
    patterns: {
      byId: { [patternId]: pattern },
      allIds: [patternId],
    }
  })
});

app.get('/api/patterns/:patternId', (req, res) => {

  const patternId = req.params.patternId;
  const pattern = mockServerData.patterns.byId[patternId];
  let patterns = { byId: {}, allIds: [] };
  let sections = { byId: {}, allIds: [] };

  if (pattern) {
    patterns = {
      byId: { [patternId]: pattern },
      allIds: [patternId]
    };
    if (pattern.sectionIds) {
      sections = {
        byId: utils.filterObject(mockServerData.sections.byId, pattern.sectionIds),
        allIds: pattern.sectionIds
      };
    }
  }

  // res.send({ patterns, sections, rows });
  setTimeout(() => res.send({ patterns, sections }), 200);
  // next('test error');

});

app.post('/api/sections', (req, res) => {
  const section = req.body.section;
  res.send({
    sections: {
      byId: { [section.sectionId]: section },
      allIds: [section.sectionId],
    },
  })
});

app.get('/api/sections/:sectionId', (req, res) => {

  const sectionId = req.params.sectionId;
  const section = mockServerData.sections.byId[sectionId];

  const sections = {
    byId: { [section.sectionId]: section },
    allIds: [section.sectionId],
  };
  res.send({ sections });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
