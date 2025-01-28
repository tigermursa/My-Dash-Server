import JobApplication from './jobtracker.model';
import { IJobApplication } from './jobtracker.interface';

// Create a new job application
export const createJobApplication = async (
  jobData: IJobApplication,
): Promise<IJobApplication> => {
  try {
    const newJob = new JobApplication(jobData);
    return await newJob.save();
  } catch (error) {
    throw new Error('Failed to create job application');
  }
};

// Get all job applications for a user
export const getAllJobApplications = async (
  userId: string,
): Promise<IJobApplication[]> => {
  try {
    return await JobApplication.find({ userId }).exec();
  } catch (error) {
    throw new Error('Failed to fetch job applications');
  }
};

// Update a job application
export const updateJobApplication = async (
  userId: string,
  jobId: string,
  updateData: Partial<IJobApplication>,
): Promise<IJobApplication | null> => {
  try {
    return await JobApplication.findOneAndUpdate(
      { _id: jobId, userId },
      updateData,
      { new: true },
    ).exec();
  } catch (error) {
    throw new Error('Failed to update job application');
  }
};

// Delete a job application
export const deleteJobApplication = async (
  userId: string,
  jobId: string,
): Promise<IJobApplication | null> => {
  try {
    return await JobApplication.findOneAndDelete({ _id: jobId, userId }).exec();
  } catch (error) {
    throw new Error('Failed to delete job application');
  }
};

// Get a single job application by ID
export const getJobApplicationById = async (
  userId: string,
  jobId: string,
): Promise<IJobApplication | null> => {
  try {
    return await JobApplication.findOne({ _id: jobId, userId }).exec();
  } catch (error) {
    throw new Error('Failed to fetch the job application');
  }
};
