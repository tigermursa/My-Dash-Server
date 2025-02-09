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
  '/get-job-applications/:userID', //! working
  getAllJobApplications,
);

JobApplicationRouter.post('/create', createJobApplication); //! done

//takes job id as params and userid as body to update
JobApplicationRouter.put('/update/:id', updateJobApplication); //!done working

JobApplicationRouter.delete('/delete/:id', deleteJobApplication); //! done working

// Route to get a specific job application by ID
JobApplicationRouter.get(
  '/get-job-application/:userID/:id',
  getJobApplicationById, //! done working
);

export default JobApplicationRouter;
