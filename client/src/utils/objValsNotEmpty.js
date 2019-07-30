
const objValsNotEmpty = obj => (
  Object.values(obj).reduce((acc, item) => item || acc, false)
);

export default objValsNotEmpty;
