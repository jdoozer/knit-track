
const express = require('express');
const bodyParser = require('body-parser');
const mockServerData = require('./mockServerData');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/api/patterns', (req, res) => {
  res.send({ patterns: mockServerData.patterns });
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

// app.post('/api/patterns', (req, res) => {
//   res.send({ pattern: req.body.pattern })
// });

app.get('/api/patterns/:patternId', (req, res) => {

  const patternId = req.params.patternId;
  const pattern = mockServerData.patterns.byId[patternId];

  const patterns = {
    byId: { [patternId]: pattern },
    allIds: [patternId]
  };
  const sections = {
    byId: utils.filterObject(mockServerData.sections.byId, pattern.sectionIds),
    allIds: pattern.sectionIds
  };

  const rowIds = utils.combineObjectArrays(sections.byId, 'rowIds');
  const rows = {
    byId: utils.filterObject(mockServerData.rows.byId, rowIds),
    allIds: rowIds
  };

  res.send({ patterns, sections, rows });

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
