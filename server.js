
const express = require('express');

const mockServerData = require('./mockServerData');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 5000;


app.get('/api/patterns', (req, res) => {
  res.send({ patterns: mockServerData.patterns.byId });
});


app.get('/api/patterns/:patternId', (req, res) => {

  const pattern = mockServerData.patterns.byId[req.params.patternId];
  const sections = utils.reduceObject(mockServerData.sections.byId, pattern.sectionIds);

  const rowIds = utils.combineIds(sections, 'rowIds');
  const rows = utils.reduceObject(mockServerData.rows.byId, rowIds);

  res.send({ pattern, sections, rows });

});


app.get('/api/sections/:sectionId', (req, res) => {

  const section = mockServerData.sections.byId[req.params.sectionId];
  const rows = utils.reduceObject(mockServerData.rows.byId, section.rowIds);

  res.send({ section, rows });

});


app.listen(port, () => console.log(`Listening on port ${port}`));
