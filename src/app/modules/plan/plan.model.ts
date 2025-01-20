import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPlan, ITask } from './plan.interface';

interface IPlanModel extends IPlan, Document {}

const TaskSchema = new Schema<ITask>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const PlanSchema = new Schema<IPlanModel>(
  {
    userId: { type: String, required: true, index: true }, // Indexing userId for fast lookups
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['todo', 'week', 'month', 'year'],
      required: true,
    },
    tasks: [TaskSchema], // Use the task schema to maintain the task structure
  },
  { timestamps: true, versionKey: false },
);

// Ensure there's an index on userId and type for faster queries
PlanSchema.index({ userId: 1, type: 1 });

const PlanModel: Model<IPlanModel> = mongoose.model<IPlanModel>(
  'Plan',
  PlanSchema,
);

export default PlanModel;
