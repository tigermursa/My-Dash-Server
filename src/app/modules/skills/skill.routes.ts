import { Router } from 'express';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from './skills.controller';

const SkillRouter = Router();

// Route to get all skills for a user
SkillRouter.get('/skills', getAllSkills);

// Route to create a new skill
SkillRouter.post('/skills', createSkill);

// Route to update a specific skill
SkillRouter.put('/skills/:id', updateSkill);

// Route to delete a specific skill
SkillRouter.delete('/skills/:id', deleteSkill);

export default SkillRouter;
