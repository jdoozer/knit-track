
const deleteKeys = (obj, keys) => (
  Object.keys(obj).reduce(
    (newObj, currKey) => {
      if (keys && !keys.includes(currKey))  newObj[currKey] = obj[currKey];
      return newObj;
    },
    {}
  )
);

export default deleteKeys;
