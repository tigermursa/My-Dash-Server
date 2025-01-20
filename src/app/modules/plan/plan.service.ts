import { IPlan } from './plan.interface';
import planModel from './plan.model';

class PlanService {
  async createPlan(planData: IPlan) {
    return await planModel.create(planData);
  }

  async getPlansByUser(userId: string) {
    return await planModel.find({ userId });
  }

  async updatePlan(planId: string, updateData: Partial<IPlan>) {
    return await planModel.findByIdAndUpdate(planId, updateData, { new: true });
  }

  async deletePlan(planId: string) {
    return await planModel.findByIdAndDelete(planId);
  }
}

export default new PlanService();
