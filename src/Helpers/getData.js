import axios from 'axios';

export const getData = async (variety) => {
  return await axios
    .get(`https://dummyjson.com/${variety}?limit=30`, { mode: 'cors' })
    .then((response) => response.data);
};
