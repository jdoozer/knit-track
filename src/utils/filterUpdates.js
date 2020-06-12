import isEmpty from 'utils/isEmpty';

function filterUpdates(objCurr, objPrev) {
  if (!objPrev) return objCurr;

  let objUpdates = {};
  
  // eslint-disable-next-line
  for (let [keyCurr, valCurr] of Object.entries(objCurr)) {
    if (valCurr !== objPrev[keyCurr]) {
      if (Array.isArray(valCurr)) {
        const nullFill = (objPrev[keyCurr] && objPrev[keyCurr].length > valCurr.length)
          ? Array(objPrev[keyCurr].length - valCurr.length).fill(null)
          : [];
        objUpdates[keyCurr] = valCurr.concat(nullFill);
      } else {
        objUpdates[keyCurr] = valCurr;
      }
    }
  }

  if (isEmpty(objUpdates)) return;
  return objUpdates;
}

export default filterUpdates;
