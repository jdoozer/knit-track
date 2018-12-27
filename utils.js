
exports.reduceObject = (obj, keys) => {

  const objectAccum = (newObj, key) => {
    newObj[key] = obj[key];
    return newObj;
  }

  return keys.reduce(objectAccum, {});

};

exports.combineIds = (objArray, idField) => {

  const ids = objArray.map(obj => obj.idField);
  return [].concat(...ids);

}
