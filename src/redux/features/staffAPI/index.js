import { baseUrl } from '../../../shared/baseUrl';

export const fetchById= () => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl)
}

export const fetchByDeptId = (deptId) => {
  const inputUrl = baseUrl + 'departments/' + deptId;
  const staffs = fetch(inputUrl)
    .then((response) => response.json())
    // .then((staffs) =>
    //   staffs.filter(
    //     (staff) => staff.departmentId.toLowerCase() === deptId.toLowerCase()
    //   )
    // );
  //! return Promise
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
