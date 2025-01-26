import mongoose, { Document } from 'mongoose';

export interface ISkill extends Document {
  id: string;
  skillName: string;
  category: 'frontend' | 'backend' | 'tool' | 'plan-to-learn' | 'extra';
  level: 'beginner' | 'medium' | 'advanced';
}
