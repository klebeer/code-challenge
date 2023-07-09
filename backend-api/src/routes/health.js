import express from 'express';
import { healthCheck } from '../controllers/healthController.js';

const healthRouter = express.Router();

healthRouter.get('/', healthCheck);

export default healthRouter;
