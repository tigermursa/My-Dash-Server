// routes/plan.routes.ts
import express from 'express';
import {
  createTaskHandler,
  toggleTaskFieldHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskTextHandler,
} from './plan.controller';

const PlanRoutes = express.Router();

PlanRoutes.post('/create', createTaskHandler);
PlanRoutes.patch('/tasks/important', toggleTaskFieldHandler('important'));
PlanRoutes.patch('/tasks/completed', toggleTaskFieldHandler('isCompleted'));
PlanRoutes.patch('/tasks/text', updateTaskTextHandler);
PlanRoutes.delete('/tasks/delete', deleteTaskHandler);
PlanRoutes.get('/tasks/:userID', getTasksHandler);

export default PlanRoutes;
