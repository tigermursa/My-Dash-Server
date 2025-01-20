import { Router } from 'express';
import planController from './plan.controller';

const planRoutes = Router();

// Routes for plan operations
planRoutes.post('/', planController.createPlan); // Create new plan
planRoutes.get('/:userId', planController.getPlans); // Get plans by user
planRoutes.put('/:planId', planController.updatePlan); // Update plan by ID
planRoutes.delete('/:planId', planController.deletePlan); // Delete plan by ID

export default planRoutes;
