
function filterUpdates(obj, objInit) {
  if (objInit) {
    let newObj = {};
    // eslint-disable-next-line
    for (let key of Object.keys(obj)) {
      if (obj[key] !== objInit[key])
        newObj[key] = obj[key];
    }
    return newObj;
  }
  return obj;
}

export default filterUpdates;
