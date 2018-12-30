
const express = require('express');

const mockServerData = require('./mockServerData');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 5000;


app.get('/api/patterns', (req, res) => {
  res.send({ patterns: mockServerData.patterns });
});


app.get('/api/patterns/:patternId', (req, res) => {

  const pattern = mockServerData.patterns.byId[req.params.patternId];
  const sections = {
    byId: utils.filterObject(mockServerData.sections.byId, pattern.sectionIds),
    allIds: pattern.sectionIds
  };

  const rowIds = utils.combineObjectArrays(sections.byId, 'rowIds');
  const rows = {
    byId: utils.filterObject(mockServerData.rows.byId, rowIds),
    allIds: rowIds
  };

  res.send({ pattern, sections, rows });

});


app.get('/api/sections/:sectionId', (req, res) => {

  const section = mockServerData.sections.byId[req.params.sectionId];
  const rows = {
    byId: utils.filterObject(mockServerData.rows.byId, section.rowIds),
    allIds: section.rowIds
  };

  res.send({ section, rows });

});


app.listen(port, () => console.log(`Listening on port ${port}`));
