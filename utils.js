
exports.reduceObject = (obj, keys) => {

  const objectAccum = (newObj, key) => {
    newObj[key] = obj[key];
    return newObj;
  }

  return keys.reduce(objectAccum, {});

};


exports.combineIds = (obj, idField) => {

  const ids = Object.keys(obj).map(key => obj[key][idField]);
  return [].concat(...ids);

};
