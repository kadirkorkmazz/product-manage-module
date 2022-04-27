import axios from 'axios';

export const setData = async (id, variety, data) => {
  const url = `https://dummyjson.com/${variety}/${id}`;
  return axios
    .put(url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      console.log(data);
    });
};
