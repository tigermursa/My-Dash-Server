import { Router } from 'express';
import {
  createTaskHandler,
  toggleImportantHandler,
  toggleIsCompletedHandler,
  deleteTaskHandler,
  getTasksHandler,
} from './plan.controller';

const PlanROutes = Router();

PlanROutes.post('/create', createTaskHandler);
PlanROutes.patch('/task/important', toggleImportantHandler);
PlanROutes.patch('/task/completed', toggleIsCompletedHandler);
PlanROutes.delete('/delete', deleteTaskHandler);
PlanROutes.get('/tasks/:userID', getTasksHandler);

export default PlanROutes;
