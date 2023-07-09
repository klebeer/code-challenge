import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const getFilesData = () => {
  return axios.get(`${baseURL}/files/data`);
};
