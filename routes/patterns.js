const mockServerData = require('./../mockServerData');
const utils = require('./../utils');
const generateId = require('uuid/v4');

const express = require('express');
const createError = require('http-errors');
const router = express.Router();


router.get('/', (_, res, next) => {
  res.send({ patterns: mockServerData.patterns });
});


router.get('/:patternId', (req, res, next) => {

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
    res.send({ patterns, sections });
  } else {
    next(createError(404, 'pattern not found'));
  }
});


router.post('/', (req, res, next) => {
  res.send({ name: generateId() });
});


router.delete('/:patternId', (req, res, next) => {

  const patternId = req.params.patternId;
  const sectionIds = mockServerData.patterns.byId[patternId].sectionIds;

  res.send({ patternId, sectionIds });

});


module.exports = router;
