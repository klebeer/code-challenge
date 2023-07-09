import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
};

export default errorHandler;
