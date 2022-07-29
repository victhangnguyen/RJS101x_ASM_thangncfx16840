function sortBy(arr, type) {
  //! guard clause
  if (typeof arr === 'undefined') return [];

  //! return a new Shallow Array
  const newArr = [...arr];
  return newArr.sort((a, b) => {
    switch (type) {
      case 'id-ascending':
        return a.id - b.id;
      case 'id-descending':
        return b.id - a.id;
      case 'name-ascending':
        return a.name
          .split(' ')
          .slice(-1)[0]
          .localeCompare(b.name.split(' ').slice(-1)[0]);
      case 'name-descending':
        return b.name
          .split(' ')
          .slice(-1)[0]
          .localeCompare(a.name.split(' ').slice(-1)[0]);
      case 'salary-ascending':
        return [
          a.salaryScale * 3000000 +
            a.overTime * 200000 -
            (b.salaryScale * 3000000 + b.overTime * 200000),
        ];
      // staff.salaryScale * 3000000 + staff.overTime * 200000
      case 'salary-descending':
        return [
          b.salaryScale * 3000000 +
            b.overTime * 200000 -
            (a.salaryScale * 3000000 + a.overTime * 200000),
        ];
      default:
        return 0;
    }
  });
}

export { sortBy };
