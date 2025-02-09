import { Request, Response } from 'express';
import * as projectService from './project.service';
import { IProject } from './project.interface';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const getAllProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const projects = await projectService.getAllProjects(userId);
    res
      .status(200)
      .json({ message: 'Projects fetched successfully', projects });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projectData: IProject = req.body;
    const { userId, projectName, category, priority, status } = projectData;
    if (!userId || !projectName || !category || !priority || !status) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: 'Invalid User ID format' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const newProject = await projectService.createProject(projectData);
    res
      .status(201)
      .json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const updateData: Partial<IProject> = req.body;
    const updatedProject = await projectService.updateProject(
      userId,
      id,
      updateData,
    );
    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }
    const userExists = await User.findById(userId).exec();
    if (!userExists || userExists.isDeleted) {
      res.status(404).json({ message: 'Invalid User ID' });
      return;
    }
    const deletedProject = await projectService.deleteProject(userId, id);
    if (!deletedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};
