const mockServerData = require('./../mockServerData');
const generateId = require('uuid/v4');

const express = require('express');
const createError = require('http-errors');
const router = express.Router();


router.get('/:sectionId', (req, res, next) => {

  const sectionId = req.params.sectionId;
  const section = mockServerData.sections.byId[sectionId];

  if (section) {
    const sections = {
      byId: { [section.sectionId]: section },
      allIds: [section.sectionId],
    };
    res.send({ sections });
  } else {
    res.status(404).send({ error: "section not found "});
  }
});

router.post('/', (req, res, next) => {
  res.send({ name: generateId() });
});

router.patch('/:sectionId', (req, res, next) => {

  let sectionUpdates = req.body;
  sectionUpdates.sectionId = req.params.sectionId;

  if (sectionUpdates.currentRow === 3) {
    next(createError(500, 'test error'));
  }
  else {
    res.send(sectionUpdates);
  }

});

router.delete('/:sectionId', (req, res, next) => {

  const sectionId = req.params.sectionId;
  const patternId = mockServerData.sections.byId[sectionId].patternId;

  res.send({ patternId, sectionId });

});


module.exports = router;
