import { baseUrl } from '../../../shared/baseUrl';

export const fetchById = (staffId) => {
  const inputUrl = baseUrl + 'staffs';
  const staff = fetch(inputUrl)
    .then((response) => response.json())
    .then((staffs) => staffs.filter((staff) => String(staff.id) === staffId));
    console.log('%c_fetchById: ', 'color: blue; font-weight: bold', staff); //! __DEBUG
    console.log('%c_staffId: ', 'color: blue; font-weight: bold', staffId); //! __DEBUG
    
  return staff;
};

export const fetchByDeptId = (deptId) => {
  const inputUrl = baseUrl + 'departments/' + deptId;
  const staffs = fetch(inputUrl).then((response) => response.json());

  return staffs;
};

export const fetchAll = () => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl).then((response) => response.json());
};

export const fetchAllwithSalary = () => {
  const inputUrl = baseUrl + 'staffsSalary';
  return fetch(inputUrl).then((response) => response.json());
};

export const add = (newStaff) => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl, {
    method: 'POST',
    body: JSON.stringify(newStaff),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then((response) => response.json());
};
