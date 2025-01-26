import { Router } from 'express';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from './skills.controller';

const SkillRouter = Router();

// Route to get all skills for a user
SkillRouter.get('/get-skills', getAllSkills); //! not ok have to improve the response

// Route to create a new skill
SkillRouter.post('/create', createSkill); //! not ok have to improve the response

// Route to update a specific skill
SkillRouter.put('/update/:id', updateSkill); //! not ok have to improve the response

// Route to delete a specific skill
SkillRouter.delete('/delete/:id', deleteSkill); //! not ok have to improve the response

export default SkillRouter;
