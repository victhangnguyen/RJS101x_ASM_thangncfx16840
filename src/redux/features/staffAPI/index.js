import { baseUrl } from '../../../shared/baseUrl';
import { fetchStaffsSalary } from '../staff/staffSlice';

export const fetchById = (staffId) => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const data = response
            .json()
            .then((staffs) =>
              staffs.filter((staff) => String(staff.id) === staffId)
            );
          resolve(data);
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};

export const fetchByDeptId = (deptId) => {
  const inputUrl = baseUrl + 'departments/' + deptId;
  return fetch(inputUrl).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const data = response.json();
          resolve(data);
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};

export const fetchAll = () => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const data = response.json();
          resolve(data);
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};

export const fetchAllwithSalary = () => {
  const inputUrl = baseUrl + 'staffsSalary';
  return fetch(inputUrl).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const data = response.json();
          resolve(data);
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};

export const addOne = (newStaff) => {
  //! This API return a added Staff
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl, {
    method: 'POST',
    body: JSON.stringify(newStaff),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const data = response.json().then((staffs) => staffs.at(-1));
          //! return added staff
          resolve(data);
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};

export const editOne = (staffValues) => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl, {
    method: 'PATCH',
    body: JSON.stringify(staffValues),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const data = response
            .json()
            .then((staffs) =>
              staffs.find(
                (staff) => String(staff.id) === String(staffValues.id)
              )
            );
          resolve(data);
          //! return a edited staff
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};

export const deleteOne = (staffId) => {
  const inputUrl = baseUrl + `staffs/${staffId}`;
  return fetch(inputUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        if (response.ok) {
          const staffs = response.json();
          resolve(staffs);
        } else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText //! error.message
          );
          error.response = response;
          reject(error);
        }
      })
  );
};
