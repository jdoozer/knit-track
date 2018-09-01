
const express = require('express');

const mockServerData = require('./mockServerData');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/patterns', (req, res) => {
  res.send({ patterns: mockServerData.patterns.byId });
});

app.get('/api/patterns/:patternId', (req, res) => {
  res.send({ pattern: mockServerData.patterns.byId[req.params.patternId] });
});

app.get('/api/patterns/:patternId/sections', (req, res) => {
  const sectionIds = mockServerData.patterns.byId[req.params.patternId].sectionIds;
  const sections = utils.reduceObject(mockServerData.sections.byId, sectionIds);
  res.send({ sections });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
