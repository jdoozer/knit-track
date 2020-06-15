const express = require('express');
const createError = require('http-errors');

function makeRouter(db) {

  const router = express.Router();

  router.get('/', async (_, res, next) => {
    try {
      const patternsSnapshot = await db.ref('patterns').once('value');
      const patternsById = patternsSnapshot.val();

      // add sectionIds as empty array here before sending to app
      const patternKeys = Object.keys(patternsById);
      patternKeys.forEach(patternId => {
        const currPattern = patternsById[patternId];
        if (!currPattern.sectionIds) { currPattern.sectionIds = [] }
      });

      res.send({ patterns:
        { byId: patternsById, allIds: patternKeys }
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
      let pattern = patternSnapshot.val();

      if (pattern) {

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
        } else {
          pattern.sectionIds = [];
        }

        const patterns = {
          byId: { [patternId]: pattern },
          allIds: [patternId]
        };

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
      // create new slot in database and get ID
      const patternRef = await db.ref('patterns').push();
      const patternId = patternRef.key;

      // add new ID as field in pattern -- NOTE: would initialize sectionIds
      // array here but firebase won't store an empty array
      let pattern = req.body.pattern;
      pattern.patternId = patternId;

      // push pattern to database
      await patternRef.set(pattern);
      res.send(pattern);

    } catch(error) {
      next(createError(500, error.message));
      return;
    }
  });

  router.patch('/:patternId', async (req, res, next) => {
    try {
      const patternUpdates = req.body;
      const patternId = req.params.patternId;
      await db.ref('patterns').child(patternId).update(patternUpdates);
      res.send(patternUpdates);
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
      let removePromises = sectionIdsSnapshot.exists()
        ? sectionIdsSnapshot.val().map(id => db.ref(`sections/${id}`).remove())
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
