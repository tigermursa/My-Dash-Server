import { Request, Response } from 'express';
import planService from './plan.service';

class PlanController {
  // Create a new plan
  async createPlan(req: Request, res: Response): Promise<void> {
    try {
      const plan = await planService.createPlan(req.body);
      res.status(201).json(plan); // 201 Created
    } catch (error) {
      res.status(500).json({
        message: 'Error creating plan',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Get all plans for a user
  async getPlans(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const plans = await planService.getPlansByUser(userId);
      res.status(200).json(plans); // 200 OK
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching plans',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Update a specific plan by ID
  async updatePlan(req: Request, res: Response): Promise<void> {
    try {
      const { planId } = req.params;
      const updatedPlan = await planService.updatePlan(planId, req.body);
      if (updatedPlan) {
        res.status(200).json(updatedPlan); // 200 OK
      } else {
        res.status(404).json({ message: 'Plan not found' }); // 404 Not Found
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error updating plan',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Delete a specific plan by ID
  async deletePlan(req: Request, res: Response): Promise<void> {
    try {
      const { planId } = req.params;
      const result = await planService.deletePlan(planId);
      if (result) {
        res.status(200).json({ message: 'Plan deleted successfully' }); // 200 OK
      } else {
        res.status(404).json({ message: 'Plan not found' }); // 404 Not Found
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting plan',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new PlanController();
