import { Router } from 'express';
import {
  createTaskHandler,
  toggleStateHandler,
  deleteTaskHandler,
  getTasksHandler,
} from './plan.controller';

const PlanROutes = Router();

PlanROutes.post('/create', createTaskHandler);
PlanROutes.patch('/task/important', toggleStateHandler);
PlanROutes.patch('/task/completed', toggleStateHandler);
PlanROutes.delete('/delete', deleteTaskHandler);
PlanROutes.get('/tasks/:userID', getTasksHandler);

export default PlanROutes;
