import express from 'express';
import { getFilesData, getFilesList } from '../controllers/filesController.js';

const fileRouter = express.Router();

fileRouter.get('/data', getFilesData);
fileRouter.get('/list', getFilesList);

export default fileRouter;
