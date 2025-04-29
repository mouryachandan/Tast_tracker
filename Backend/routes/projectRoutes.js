import express from 'express';
import { createProject } from '../controllers/projectController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createProject);

export default router;
