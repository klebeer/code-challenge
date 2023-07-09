import dotenv from 'dotenv';

import logger from './utils/logger.js';
import app from './app.js';

dotenv.config();
const start = async () => {
  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || 'development';
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}, environment: ${nodeEnv}`);
  });
};

start().then(() => logger.info('Server started'));
