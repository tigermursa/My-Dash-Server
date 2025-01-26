import mongoose, { Schema } from 'mongoose';
import { ISkill } from './skills.interface';

// Define the Skill schema
const SkillSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  skillName: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'tool', 'plan-to-learn', 'extra'],
  },
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'medium', 'advanced'],
  },
});

// Export the Skill model
export default mongoose.model<ISkill>('Skill', SkillSchema);
