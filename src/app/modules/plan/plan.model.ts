import mongoose, { Schema, Document } from 'mongoose';
import { IPlan } from './plan.interface';

interface IPlanModel extends IPlan, Document {}

const PlanSchema = new Schema<IPlanModel>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['todo', 'week', 'month', 'year'],
      required: true,
    },
    tasks: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IPlanModel>('Plan', PlanSchema);
