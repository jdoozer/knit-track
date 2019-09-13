const express = require('express');
const createError = require('http-errors');

function makeRouter(db) {

  const router = express.Router();

  router.get('/:sectionId', async (req, res, next) => {

    const sectionId = req.params.sectionId;

    try {
      const sectionSnapshot = await db.ref('sections').child(sectionId)
        .once('value');
      const section = sectionSnapshot.val();

      if (section) {
        const sections = {
          byId: { [sectionId]: section },
          allIds: [sectionId]
        };
        res.send({ sections });
      } else {
        next(createError(404, 'section not found'));
        return;
      }
    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      let section = req.body.section;
      const { patternId } = section;
      const pattSectionIdsRef = db.ref(`patterns/${patternId}/sectionIds`);

      // Create new slot in section database and get ID
      // Get pattern's sectionIds in parallel
      const sectionRefPromise = db.ref('sections').push();
      const pattSectionIdsSnapshotPromise = pattSectionIdsRef.once('value');
      const [sectionRef, pattSectionIdsSnapshot] = await Promise.all([
        sectionRefPromise,
        pattSectionIdsSnapshotPromise
      ]);

      // add new ID as field in section, initialize current row
      const sectionId = sectionRef.key;
      section.sectionId = sectionId;
      section.currentRow = 1;

      // add new ID to pattern's sectionIds
      // (need conditional b/c firebase won't store empty arrays)
      const patternSectionIds = (pattSectionIdsSnapshot.exists())
        ? pattSectionIdsSnapshot.val().concat(sectionId)
        : [sectionId];

      // send data to database
      await Promise.all([
        sectionRef.set(section),
        pattSectionIdsRef.set(patternSectionIds)
      ]);

      res.send(section);
    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  router.patch('/:sectionId', async (req, res, next) => {
    try {
      const sectionUpdates = req.body;
      const sectionId = req.params.sectionId;
      await db.ref('sections').child(sectionId).update(sectionUpdates);
      res.send(sectionUpdates);
    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });


  router.delete('/:sectionId', async (req, res, next) => {
    try {
      const sectionId = req.params.sectionId;
      const sectionRef = db.ref('sections').child(sectionId);

      // get patternId to update before we delete the section
      const patternIdSnapshot = await sectionRef.child('patternId')
        .once('value');
      const patternId = patternIdSnapshot.val();

      // set up new sectionIds array for pattern
      const patternSectionIdsRef = db.ref(`patterns/${patternId}/sectionIds`);
      const sectionIdsSnapshot = await patternSectionIdsRef.once('value');
      const sectionIds = (sectionIdsSnapshot.exists())
        ? pattSectionIdsSnapshot.val().filter(id => id !== sectionId)
        : [];


      // delete section and update sectionIds in pattern
      await Promise.all([
        sectionRef.remove(),
        patternSectionIdsRef.set(sectionIds)
      ]);

      res.send({ patternId, sectionId });

    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  return router;
}

module.exports = makeRouter;
