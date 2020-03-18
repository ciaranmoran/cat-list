export const cloneArray = arr => arr.map(item => ({ ...item }));

export const groupByKey = (arr, key) =>
  arr.reduce((groupedItem, currentItem) => {
    groupedItem[currentItem[key]] =
      groupedItem[currentItem[key]] || [];

    groupedItem[currentItem[key]].push(currentItem);

    return groupedItem;
  }, {});

export const orderByKey = (arr, key) => {
  return arr.sort((previousItem, currentItem) => {
    if (previousItem[key] > currentItem[key]) {
      return 1;
    }
    return -1;
  });
};

export const deDuplicate = arr =>
  arr.filter((value, index) => arr.indexOf(value) === index);
