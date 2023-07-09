import axios from 'axios';

const TIMEOUT = parseInt(process.env.FILE_SERVICE_TIMEOUT, 10) || 5;

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: TIMEOUT * 1000,
  });
};

export default createAxiosInstance;
