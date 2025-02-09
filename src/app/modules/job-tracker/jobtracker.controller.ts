import { Request, Response } from 'express';
import * as jobApplicationService from './jobtracker.service';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

// Utility function to check if an ID is a valid ObjectId
const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getAllJobApplications = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; //!limit

    if (!userID) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const userExists = await User.findById(userID).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const { total, jobApplications } =
      await jobApplicationService.getAllJobApplications(userID, page, limit);

    res.status(200).json({
      message: 'Job applications fetched successfully',
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      jobApplications,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const createJobApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const jobData = req.body;
    if (
      !jobData.userId ||
      !jobData.company ||
      !jobData.position ||
      !jobData.status
    ) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (!isValidObjectId(jobData.userId)) {
      res.status(400).json({ message: 'Invalid User ID format' });
      return;
    }

    const userExists = await User.findById(jobData.userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const newJobApplication =
      await jobApplicationService.createJobApplication(jobData);
    res.status(201).json({
      message: 'Job application created successfully',
      jobApplication: newJobApplication,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const updateJobApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Extract parameters
    const { id: jobId } = req.params; // Job application ID from URL
    const { userId, ...updateData } = req.body; // User ID and update data from body

    // Validate required fields
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Invalid User ID format' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      res.status(400).json({ message: 'Invalid Job Application ID format' });
      return;
    }

    // Check if the user exists
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    // Call the service layer to update the job application
    const updatedJobApplication =
      await jobApplicationService.updateJobApplication(
        userId,
        jobId,
        updateData,
      );

    if (!updatedJobApplication) {
      res.status(404).json({ message: 'Job application not found' });
      return;
    }

    // Respond with success
    res.status(200).json({
      message: 'Job application updated successfully',
      jobApplication: updatedJobApplication,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const deleteJobApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.body;
    const { id } = req.params;

    if (!userID) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const userExists = await User.findById(userID).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }

    const deletedJobApplication =
      await jobApplicationService.deleteJobApplication(userID, id);

    if (!deletedJobApplication) {
      res.status(404).json({ message: 'Job application not found' });
      return;
    }

    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const getJobApplicationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID, id } = req.params;
    if (!userID || !id) {
      res
        .status(400)
        .json({ message: 'User ID and Job Application ID are required' });
      return;
    }

    const jobApplication = await jobApplicationService.getJobApplicationById(
      userID,
      id,
    );

    if (!jobApplication) {
      res.status(404).json({ message: 'Job application not found' });
      return;
    }

    res.status(200).json({
      message: 'Job application fetched successfully',
      jobApplication,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
