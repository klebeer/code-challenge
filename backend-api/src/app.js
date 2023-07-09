import express from 'express';

import errorHandler from './middlewares/errorHandler.js';
import helmet from 'helmet';
import filesRouter from './routes/filesRouter.js';
import healthRouter from './routes/health.js';

const app = express();
app.use(helmet());
app.use(express.json());
app.use('/files', filesRouter);
app.use('/health', healthRouter);
app.use(errorHandler);

export default app;
