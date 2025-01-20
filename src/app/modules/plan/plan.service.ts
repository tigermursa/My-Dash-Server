import { IPlan, ITask } from './plan.interface';
import PlanModel from './plan.model';

class PlanService {
  // Create a new plan
  async createPlan(planData: IPlan): Promise<IPlan> {
    try {
      const plan = new PlanModel(planData);
      return await plan.save(); // Use save for atomic operation
    } catch (error) {
      throw new Error('Failed to create plan');
    }
  }

  // Get all plans by user ID
  async getPlansByUser(userId: string): Promise<IPlan[]> {
    try {
      return await PlanModel.find({ userId }).lean(); // Use lean() for better performance
    } catch (error) {
      throw new Error('Failed to fetch plans');
    }
  }

  // Update a plan by ID
  async updatePlan(
    planId: string,
    updateData: Partial<IPlan>,
  ): Promise<IPlan | null> {
    try {
      return await PlanModel.findByIdAndUpdate(planId, updateData, {
        new: true,
        runValidators: true,
        lean: true, // Improved performance with lean() to skip Mongoose documents
      });
    } catch (error) {
      throw new Error('Failed to update plan');
    }
  }

  // Delete a plan by ID
  async deletePlan(planId: string): Promise<IPlan | null> {
    try {
      return await PlanModel.findByIdAndDelete(planId).lean(); // lean() for performance boost
    } catch (error) {
      throw new Error('Failed to delete plan');
    }
  }

  // Add a task to a plan
  async addTaskToPlan(planId: string, task: ITask): Promise<IPlan | null> {
    try {
      return await PlanModel.findByIdAndUpdate(
        planId,
        { $push: { tasks: task } },
        { new: true, runValidators: true, lean: true },
      );
    } catch (error) {
      throw new Error('Failed to add task');
    }
  }

  // Mark a task as completed in a plan
  async markTaskAsCompleted(
    planId: string,
    taskId: string,
  ): Promise<IPlan | null> {
    try {
      return await PlanModel.findOneAndUpdate(
        { _id: planId, 'tasks.id': taskId },
        { $set: { 'tasks.$.completed': true } },
        { new: true, lean: true },
      );
    } catch (error) {
      throw new Error('Failed to mark task as completed');
    }
  }
}

export default new PlanService();
