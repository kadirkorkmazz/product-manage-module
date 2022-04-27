import axios from 'axios';

export const addData = async (data, variety) => {
  const url = `https://dummyjson.com/${variety}/add`;
  return axios
    .post(url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      console.log(data);
    });
};
