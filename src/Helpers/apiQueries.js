import axios from 'axios';

export const getData = async (variety, lazyParams) => {
  let limit = lazyParams.rows;
  let page = lazyParams.page;

  return await axios
    .get(
      `https://626a41a453916a0fbdf7eaae.mockapi.io/${variety}/?limit=${limit}&page=${page}`,
      {
        mode: 'cors',
      }
    )
    .then((response) => response.data);
};

export const setData = async (id, variety, data) => {
  const url = `https://626a41a453916a0fbdf7eaae.mockapi.io/${variety}/${id}`;
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

export const addData = async (data, variety) => {
  const url = `https://626a41a453916a0fbdf7eaae.mockapi.io/${variety}`;
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

export const deleteData = async (id, variety) => {
  const url = `https://626a41a453916a0fbdf7eaae.mockapi.io/${variety}/${id}`;
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
