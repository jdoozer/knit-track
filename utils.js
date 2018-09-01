
exports.reduceObject = (obj, keys) => {

  const objectAccum = (newObj, key) => {
    newObj[key] = obj[key];
    return newObj;
  }

  return keys.reduce(objectAccum, {});

};
