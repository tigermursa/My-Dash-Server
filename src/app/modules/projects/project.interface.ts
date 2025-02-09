import { Document } from 'mongoose';

export interface IProject extends Document {
  userId: string;
  projectName: string;
  category: 'frontend' | 'backend' | 'fullstack';
  githubClient?: string;
  githubServer?: string;
  liveLink?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'planned' | 'in-progress' | 'completed';
}
