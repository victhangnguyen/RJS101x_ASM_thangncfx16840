import { baseUrl } from '../../../shared/baseUrl';

export const fetchById = (staffId) => {
  const inputUrl = baseUrl + 'staffs';
  const staff = fetch(inputUrl)
    .then((response) => response.json())
    .then((staffs) => staffs.filter((staff) => String(staff.id) === staffId));
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

export const addOne = (newStaff) => {
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

export const deleteOne = (staffId) => {
  const inputUrl = baseUrl + `staffs/${staffId}`;
  return fetch(inputUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

export const editOne = (staffValues) => {
  const inputUrl = baseUrl + 'staffs';
  const editedStaff = fetch(inputUrl, {
    method: 'PATCH',
    body: JSON.stringify(staffValues),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then((response) => response.json()) //! Server return All of Staffs.
    .then(
      (staffs) =>
        staffs.filter((staff) => String(staff.id) === String(staffValues.id)) //! return editedStaff
    );
  // console.log('%c_editedStaff: ', 'color: green; font-weight: bold', res); //! __DEBUG
  return editedStaff;
};
