import fs from 'fs';
import path from 'path';
import { getExternalFiles } from '../services/fileService.js';
import logger from '../utils/logger.js';

/**
 * Health check function to validate if the system and its dependencies are running properly.
 * The function checks the presence of the 'package.json' file and the successful response from the external file service.
 *
 * @param {object} req - The request object provided by Express.js.
 * @param {object} res - The response object provided by Express.js.
 * @returns {object} A JSON object containing the status of the application, version, and a message detailing the system status.
 */
export const healthCheck = async (req, res) => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json')).toString());

    const files = await getExternalFiles();

    if (files.length > 0) {
      return res
        .status(200)
        .json({ status: 'up', version: packageJson.version, message: 'External file service is working properly' });
    } else {
      logger.warn(`Health check failed: ${files.length} files returned from the external service`);
      return res.status(503).json({ status: 'Unhealthy', details: `No files returned from the external service` });
    }
  } catch (error) {
    logger.error(`Health check failed: ${error}`);
    return res.status(503).json({ status: 'Unhealthy', details: error.message });
  }
};
