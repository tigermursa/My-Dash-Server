// routes/plan.routes.ts
import express from 'express';
import {
  createTaskHandler,
  toggleTaskFieldHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskTextHandler,
} from './plan.controller';
import { authenticateToken } from '../../middleware/authMiddleware';

const PlanRoutes = express.Router();

PlanRoutes.post('/create', createTaskHandler);
PlanRoutes.patch('/tasks/important', toggleTaskFieldHandler('important'));
PlanRoutes.patch('/tasks/completed', toggleTaskFieldHandler('isCompleted'));
PlanRoutes.patch('/tasks/text', updateTaskTextHandler);
PlanRoutes.delete('/tasks/delete', deleteTaskHandler);
PlanRoutes.get('/tasks/:userID', authenticateToken, getTasksHandler);

export default PlanRoutes;
