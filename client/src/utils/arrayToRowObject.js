
const valuesNotEmpty = obj => Object.values(obj).some(val => val);

function arrayToRowObject(rowData) {
  return (
    rowData.reduce((acc, item, index) => {
      if (valuesNotEmpty(item)) {
        acc[index+1] = item;
      }
      return acc;
    }, {})
  );
}

export default arrayToRowObject;
