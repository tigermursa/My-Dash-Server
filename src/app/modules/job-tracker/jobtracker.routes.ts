import { Router } from 'express';
import {
  getAllJobApplications,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
  getJobApplicationById,
} from './jobtracker.controller';

const JobApplicationRouter = Router();

// Route to get all job applications for a user
JobApplicationRouter.get(
  '/get-job-applications/:userID',
  getAllJobApplications,
);

// Route to create a new job application
JobApplicationRouter.post('/create', createJobApplication); //!need update

// Route to update a specific job application
JobApplicationRouter.put('/update/:id', updateJobApplication);

// Route to delete a specific job application
JobApplicationRouter.delete('/delete/:id', deleteJobApplication);

// Route to get a specific job application by ID
JobApplicationRouter.get(
  '/get-job-application/:userID/:id',
  getJobApplicationById,
);

export default JobApplicationRouter;
