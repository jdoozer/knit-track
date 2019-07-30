
const express = require('express');
const bodyParser = require('body-parser');
const mockServerData = require('./mockServerData');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/api/patterns', (req, res, next) => {

  // res.send({ patterns: mockServerData.patterns });
  setTimeout(() => res.send({ patterns: mockServerData.patterns }), 1000);
  // next('test error')

});

app.post('/api/patterns', (req, res) => {
  const pattern = req.body.pattern;
  res.send({
    patterns: {
      byId: { [pattern.patternId]: pattern },
      allIds: [pattern.patternId],
    }
  })
});

app.get('/api/patterns/:patternId', (req, res) => {

  const patternId = req.params.patternId;
  const pattern = mockServerData.patterns.byId[patternId];
  let patterns, sections;

  if (pattern) {
    patterns = {
      byId: { [patternId]: pattern },
      allIds: [patternId]
    };
    sections = {
      byId: utils.filterObject(mockServerData.sections.byId, pattern.sectionIds),
      allIds: pattern.sectionIds
    };
  } else {
    patterns = { byId: {}, allIds: [] };
    sections = patterns;
  }

  // res.send({ patterns, sections, rows });
  setTimeout(() => res.send({ patterns, sections }), 1000);
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
