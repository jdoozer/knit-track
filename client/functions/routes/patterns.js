const express = require('express');
const createError = require('http-errors');

function makeRouter(db) {

  const router = express.Router();

  router.get('/', async (_, res, next) => {
    try {
      const patternsSnapshot = await db.ref('patterns').once('value');
      const patternsById = patternsSnapshot.val();
      res.send({ patterns:
        { byId: patternsById, allIds: Object.keys(patternsById) }
      });
    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  router.get('/:patternId', async (req, res, next) => {
    try {
      const patternId = req.params.patternId;
      const patternSnapshot = await db.ref('patterns').child(patternId)
        .once('value');
      const pattern = patternSnapshot.val();

      if (pattern) {
        const patterns = {
          byId: { [patternId]: pattern },
          allIds: [patternId]
        };
        const { sectionIds } = pattern;

        let sections = { byId: {}, allIds: [] };

        if (sectionIds) {
          const sectionSnapshotPromises = sectionIds.map(id =>
            db.ref('sections').child(id).once('value')
          );
          const sectionSnapshots = await Promise.all(sectionSnapshotPromises);

          sectionIds.forEach((id, index) => {
            sections.byId[id] = sectionSnapshots[index].val();
            sections.allIds.push(id);
          });
        }

        res.send({ patterns, sections });

      } else {
        next(createError(404, 'pattern not found'));
        return;
      }
    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      let pattern = req.body.pattern;
      // create new slot in database and get ID
      const patternRef = await db.ref('patterns').push();
      const patternId = patternRef.key;

      // add new ID as field in pattern, then push pattern to database
      pattern.patternId = patternId;
      await patternRef.set(pattern);

      res.send({ name: patternId });
    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });


  router.delete('/:patternId', async (req, res, next) => {
    try {
      const patternId = req.params.patternId;
      const patternRef = db.ref('patterns').child(patternId);

      // get sectionIds to delete before we delete the pattern
      const sectionIdsSnapshot = await patternRef.child('sectionIds')
        .once('value');
      const sectionIds = sectionIdsSnapshot.val();

      // delete all the things
      let removePromises = sectionIds
        ? sectionIds.map(id => db.ref('sections').child(id).remove())
        : [];
      removePromises.push(patternRef.remove());
      await Promise.all(removePromises);

      res.send({ patternId, sectionIds });

    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  return router;
}

module.exports = makeRouter;
