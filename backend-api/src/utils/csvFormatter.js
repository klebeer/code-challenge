import logger from './logger.js';

/**
 * Formats CSV data into a JSON-like structure.
 *
 * @param {string} csvData - The raw CSV data to be formatted.
 *
 * @returns {Array<Object>} An array of objects representing each non-header row in the CSV.
 * Each object contains the properties file, text, number, and hex, with their corresponding values from the CSV.
 *
 * @throws Will throw an error if the CSV headers are invalid or missing.
 */
export const formatCSVData = (csvData) => {
  const lines = csvData.split('\n');

  const headers = lines[0].split(',').map((header) => header.trim());
  const expectedHeaders = ['file', 'text', 'number', 'hex'];

  if (
    headers.length !== expectedHeaders.length ||
    !headers.every((header, index) => header === expectedHeaders[index])
  ) {
    logger.error('Invalid CSV headers');
    throw new Error('Invalid CSV headers');
  }

  const dataLines = lines.slice(1);

  const validLines = dataLines.filter((line) => {
    const splitLine = line.split(',');
    if (splitLine.length !== 4) return false;
    const [, text, number, hex] = splitLine;
    return text && number && hex;
  });

  return validLines.map((line) => {
    const [file, text, number, hex] = line.split(',');
    return { file, text, number: parseInt(number), hex };
  });
};
