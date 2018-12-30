
exports.filterObject = (obj, keys) => {

  const objectAccum = (newObj, key) => {
    newObj[key] = obj[key];
    return newObj;
  }

  return keys.reduce(objectAccum, {});

};


exports.combineObjectArrays = (obj, field) => {

  const arr = Object.keys(obj).map(key => obj[key][field]);
  return [].concat(...arr);

};
