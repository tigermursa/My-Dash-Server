import mongoose, { Schema } from 'mongoose';
import { IExperience } from './experience.interface';

const ExperienceSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    isCurrent: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
