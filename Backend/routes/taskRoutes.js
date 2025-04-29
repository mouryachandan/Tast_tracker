import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTaskById } from '../controllers/taskController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new task (requires authentication)
router.post('/', auth, createTask);

// Get all tasks (requires authentication)
router.get('/', auth, getTasks);

// Get a specific task by ID (requires authentication)
router.get('/:id', auth, getTaskById); // Add this new route

// Update an existing task (requires authentication)
router.put('/:id', auth, updateTask);

// Delete a task (requires authentication)
router.delete('/:id', auth, deleteTask);

export default router;
