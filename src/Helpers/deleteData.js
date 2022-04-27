import axios from 'axios';

export const deleteData = async (id, variety) => {
  const url = `https://dummyjson.com/${variety}/${id}`;
  return axios
    .delete(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      console.log(data);
    });
};
