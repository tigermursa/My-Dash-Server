import { Router } from 'express';
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from './experience.controller';

const ExperienceRouter = Router();

ExperienceRouter.get('/get-experiences/:userId', getAllExperiences);
ExperienceRouter.post('/create', createExperience);
ExperienceRouter.put('/update/:id', updateExperience);
ExperienceRouter.delete('/delete/:id', deleteExperience);

export default ExperienceRouter;
