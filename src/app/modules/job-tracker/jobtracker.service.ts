import JobApplication from './jobtracker.model';
import { IJobApplication } from './jobtracker.interface';
import mongoose from 'mongoose';

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

// Get paginated job applications for a user
export const getAllJobApplications = async (
  userId: string,
  page: number,
  limit: number,
): Promise<{ total: number; jobApplications: IJobApplication[] }> => {
  try {
    const total = await JobApplication.countDocuments({ userId }).exec();
    const jobApplications = await JobApplication.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { total, jobApplications };
  } catch (error) {
    throw new Error('Failed to fetch job applications');
  }
};

export const updateJobApplication = async (
  userId: string,
  jobId: string,
  updateData: Partial<IJobApplication>,
): Promise<IJobApplication | null> => {
  try {
    // Validate the jobId format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new Error('Invalid Job Application ID format');
    }

    // Find and update the job application with matching userId and jobId
    const updatedJobApplication = await JobApplication.findOneAndUpdate(
      { _id: jobId, userId }, // Ensure the job belongs to the user
      updateData,
      { new: true }, // Return the updated document
    ).exec();

    if (!updatedJobApplication) {
      throw new Error(
        'Job application not found or does not belong to the user',
      );
    }

    return updatedJobApplication;
  } catch (error) {
    throw new Error(`Failed to update job application: ${error}`);
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
