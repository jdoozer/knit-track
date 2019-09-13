function sortByKey(arr, key) {
  const arrCopy = [...arr];
  arrCopy.sort((a, b) => {
    const itemA = a[key].toUpperCase();
    const itemB = b[key].toUpperCase();

    if (itemA < itemB)  return -1;
    if (itemA > itemB)  return 1;
    return 0;
  });
  return arrCopy;
}

export default sortByKey;
