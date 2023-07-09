import pino from 'pino';

const environment = process.env.NODE_ENV || 'development';

let logger;

if (environment === 'development') {
  logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: true,
      },
    },
  });
} else {
  logger = pino();
}

export default logger;
