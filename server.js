
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
  let patterns, sections, rows;

  if (pattern) {
    patterns = {
      byId: { [patternId]: pattern },
      allIds: [patternId]
    };
    sections = {
      byId: utils.filterObject(mockServerData.sections.byId, pattern.sectionIds),
      allIds: pattern.sectionIds
    };

    const rowIds = utils.combineObjectArrays(sections.byId, 'rowIds');
    rows = {
      byId: utils.filterObject(mockServerData.rows.byId, rowIds),
      allIds: rowIds
    };
  } else {
    patterns = { byId: {}, allIds: [] };
    sections = patterns;
    rows = patterns;
  }

  // res.send({ patterns, sections, rows });
  setTimeout(() => res.send({ patterns, sections, rows }), 1000);
  // next('test error');

});

app.post('/api/sections', (req, res) => {
  const section = req.body.section;
  const rows = req.body.rows;
  res.send({
    sections: {
      byId: { [section.sectionId]: section },
      allIds: [section.sectionId],
    },
    rows
  })
});

app.get('/api/sections/:sectionId', (req, res) => {

  const sectionId = req.params.sectionId;
  const section = mockServerData.sections.byId[sectionId];

  const sections = {
    byId: { [section.sectionId]: section },
    allIds: [section.sectionId],
  };

  const rows = {
    byId: utils.filterObject(mockServerData.rows.byId, section.rowIds),
    allIds: section.rowIds
  };

  res.send({ sections, rows });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
