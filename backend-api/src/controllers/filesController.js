import { getExternalFiles, getFileContent } from '../services/fileService.js';
import { formatCSVData } from '../utils/csvFormatter.js';
import logger from '../utils/logger.js';

/**
 * Filters the file list based on a given filename.
 * @param {string[]} files - The list of files.
 * @param {string} fileName - The name of the file to filter by.
 * @return {string[]} The filtered list of files.
 */
const filterFilesByName = (files, fileName) => {
  if (!fileName) {
    return files;
  }
  return files.filter((file) => file === fileName);
};

/**
 * Fetches and formats the data from a given file.
 * @param {string} file - The file to fetch and format data from.
 * @return {Promise<Object[]>} A promise that resolves to the formatted data from the file.
 */
const handleFileData = async (file) => {
  try {
    const fileContent = await getFileContent(file);
    const formattedData = formatCSVData(fileContent);
    return formattedData.filter((data) => data && Object.values(data).every((value) => value !== null));
  } catch (error) {
    logger.error(`Error while fetching and parsing content for file ${file}`, error.stack);
    return [];
  }
};

/**
 * Fetches and formats data from a list of files.
 * @param {string[]} files - The list of files to fetch and format data from.
 * @return {Promise<Object[][]>} A promise that resolves to an array of arrays of formatted data from the files.
 */
const getFileDataFromAllFiles = async (files) => {
  const fileDataPromises = files.map(handleFileData);
  const fileData = await Promise.all(fileDataPromises);
  return fileData.filter((data) => data.length > 0);
};

/**
 * Endpoint to get file data. Can filter by filename with a query param.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next middleware function.
 */
export const getFilesData = async (req, res, next) => {
  try {
    let files = await getExternalFiles();
    const { fileName } = req.query;

    files = filterFilesByName(files, fileName);

    if (fileName && files.length === 0) {
      res.status(404).send({ error: `File with name ${req.query.fileName} not found.` });
      return;
    }

    const nonEmptyFileData = await getFileDataFromAllFiles(files);

    res.status(200).json(nonEmptyFileData);
  } catch (error) {
    next(error);
  }
};

/**
 * Endpoint to get a list of all files.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next middleware function.
 */
export const getFilesList = async (req, res, next) => {
  try {
    const files = await getExternalFiles();
    res.status(200).json({ files });
  } catch (error) {
    logger.error(`Error while fetching files list`, error.stack);
    next(error);
  }
};
