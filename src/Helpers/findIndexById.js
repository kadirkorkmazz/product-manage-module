export const findIndexById = (id, items) => {
  let index = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};
