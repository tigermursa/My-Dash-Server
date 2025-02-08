import { Router } from 'express';
import {
  getAllJobApplications,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
  getJobApplicationById,
} from './jobtracker.controller';

const JobApplicationRouter = Router();

JobApplicationRouter.get(
  '/get-job-applications/:userID',
  getAllJobApplications,
);

JobApplicationRouter.post('/create', createJobApplication); //!need update

JobApplicationRouter.put('/update/:id', updateJobApplication);

JobApplicationRouter.delete('/delete/:id', deleteJobApplication);

// Route to get a specific job application by ID
JobApplicationRouter.get(
  '/get-job-application/:userID/:id',
  getJobApplicationById,
);

export default JobApplicationRouter;
