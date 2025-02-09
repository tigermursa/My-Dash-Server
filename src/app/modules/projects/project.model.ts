import mongoose, { Schema } from 'mongoose';
import { IProject } from './project.interface';

const ProjectSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    projectName: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['frontend', 'backend', 'fullstack'],
    },
    githubClient: { type: String },
    githubServer: { type: String },
    liveLink: { type: String },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },
    status: {
      type: String,
      required: true,
      enum: ['planned', 'in-progress', 'completed'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProject>('Project', ProjectSchema);
