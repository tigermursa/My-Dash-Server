import { Router } from 'express';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from './skills.controller';

const SkillRouter = Router();

// Route to get all skills for a user
SkillRouter.get('/get-skills', getAllSkills);

// Route to create a new skill
SkillRouter.post('/create', createSkill);

// Route to update a specific skill
SkillRouter.put('/update/:id', updateSkill);

// Route to delete a specific skill
SkillRouter.delete('/delete/:id', deleteSkill);

export default SkillRouter;
