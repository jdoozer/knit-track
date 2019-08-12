
const equalObjects = (obj, fullObj) => (
  Object.keys(obj).reduce(
    (equal, key) => equal && (obj[key] === fullObj[key]),
    true
  )
);

export default equalObjects;
