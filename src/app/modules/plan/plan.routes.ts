import { Router } from 'express';
import planController from './plan.controller';

const PlanROutes = Router();

PlanROutes.post('/', planController.createPlan);
PlanROutes.get('/:userId', planController.getPlans);
PlanROutes.put('/:planId', planController.updatePlan);
PlanROutes.delete('/:planId', planController.deletePlan);

export default PlanROutes;
