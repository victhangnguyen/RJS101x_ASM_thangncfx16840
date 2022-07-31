import { baseUrl } from '../../../shared/baseUrl';

export const fetchAll = () => {
  const inputUrl = baseUrl + 'departments';
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
