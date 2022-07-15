function sortBy(arr, type) {
  //! return a new Shallow Array
  const newArr = [...arr];
  return newArr.sort((a, b) => {
    switch (type) {
      case 'id-ascending':
        return a.id - b.id;
      case 'id-descending':
        return b.id - a.id;
      case 'name-ascending':
        return a.name.split(' ').slice(-1)[0].localeCompare(b.name.split(' ').slice(-1)[0]);
      case 'name-descending':
        return b.name.split(' ').slice(-1)[0].localeCompare(a.name.split(' ').slice(-1)[0]);
      default:
        return 0;
    }
  });
}

export { sortBy };
