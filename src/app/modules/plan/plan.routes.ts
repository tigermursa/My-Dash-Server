// routes/plan.routes.ts
import express from 'express';
import {
  createTaskHandler,
  toggleTaskFieldHandler,
  deleteTaskHandler,
  getTasksHandler,
} from './plan.controller';

const PlanR0utes = express.Router();

PlanR0utes.post('/create', createTaskHandler);
PlanR0utes.patch('/tasks/important', toggleTaskFieldHandler('important'));
PlanR0utes.patch('/tasks/completed', toggleTaskFieldHandler('isCompleted'));
PlanR0utes.delete('/tasks/delete', deleteTaskHandler);
PlanR0utes.get('/tasks/:userID', getTasksHandler);

export default PlanR0utes;
