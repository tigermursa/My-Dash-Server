import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from './project.controller';

const ProjectRouter = Router();

ProjectRouter.get('/get/:userId', getAllProjects);
ProjectRouter.post('/create', createProject);
ProjectRouter.put('/update/:id', updateProject);
ProjectRouter.delete('/delete/:id', deleteProject);

export default ProjectRouter;
