import { baseUrl } from '../../../shared/baseUrl';

export const add = (newStaff) => {
  const inputUrl = baseUrl + 'staffs';
  return fetch(inputUrl, {
    method: 'POST',
    body: JSON.stringify(newStaff),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  //! return Promise
};
