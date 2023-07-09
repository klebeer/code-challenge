import logger from '../utils/logger.js';
import createAxiosInstance from '../utils/axiosInstance.js';

const FILE_URL = process.env.FILE_SERVICE_URL || 'https://echo-serv.tbxnet.com';
const FILE_ENDPOINT = '/v1/secret/files';
const BEARER_TOKEN = 'aSuperSecretKey';

const axiosInstance = createAxiosInstance(FILE_URL);

axiosInstance.defaults.headers.common.Authorization = `Bearer ${BEARER_TOKEN}`;

/**
 * Fetches a list of available file names from the external file service.
 *
 * @returns {Promise<string[]>} A promise that resolves to a list of file names, or rejects with an error.
 */
export const getExternalFiles = async () => {
  try {
    const response = await axiosInstance.get(FILE_ENDPOINT);
    return response?.data?.files || [];
  } catch (error) {
    logger.error('Error while fetching data from file service', error);
    throw error;
  }
};

/**
 * Fetches the content of a specific file from the external file service.
 *
 * @param {string} fileName The name of the file to fetch.
 * @returns {Promise<string>} A promise that resolves to the content of the file, or rejects with an error.
 */
export const getFileContent = async (fileName) => {
  const FILE_CONTENT_ENDPOINT = `/v1/secret/file/${fileName}`;
  try {
    const response = await axiosInstance.get(FILE_CONTENT_ENDPOINT);
    return response.data;
  } catch (error) {
    logger.error(`Error while fetching content for file ${fileName}`, error.stack);
    throw error;
  }
};
