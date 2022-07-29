import { baseUrl } from '../../../shared/baseUrl';

export const fetchAll = () => {
  const inputUrl = baseUrl + 'departments';

  return fetch(inputUrl).then((response) => response.json());
};
