import { Request, Response } from 'express';
import planService from './plan.service';

class PlanController {
  async createPlan(req: Request, res: Response) {
    try {
      const plan = await planService.createPlan(req.body);
      res.status(201).json(plan);
    } catch (error) {
      res.status(500).json({ message: 'Error creating plan', error });
    }
  }

  async getPlans(req: Request, res: Response) {
    try {
      const plans = await planService.getPlansByUser(req.params.userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching plans', error });
    }
  }

  async updatePlan(req: Request, res: Response) {
    try {
      const updatedPlan = await planService.updatePlan(
        req.params.planId,
        req.body,
      );
      res.json(updatedPlan);
    } catch (error) {
      res.status(500).json({ message: 'Error updating plan', error });
    }
  }

  async deletePlan(req: Request, res: Response) {
    try {
      await planService.deletePlan(req.params.planId);
      res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting plan', error });
    }
  }
}

export default new PlanController();
