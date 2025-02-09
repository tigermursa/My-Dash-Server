import { IProject } from './project.interface';
import Project from './project.model';

export const createProject = async (
  projectData: IProject,
): Promise<IProject> => {
  try {
    const newProject = new Project(projectData);
    return await newProject.save();
  } catch (error) {
    throw new Error('Failed to create project');
  }
};

export const getAllProjects = async (userId: string): Promise<IProject[]> => {
  try {
    return await Project.find({ userId }).exec();
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};

export const updateProject = async (
  userId: string,
  projectId: string,
  updateData: Partial<IProject>,
): Promise<IProject | null> => {
  try {
    return await Project.findOneAndUpdate(
      { _id: projectId, userId },
      updateData,
      { new: true },
    ).exec();
  } catch (error) {
    throw new Error('Failed to update project');
  }
};

export const deleteProject = async (
  userId: string,
  projectId: string,
): Promise<IProject | null> => {
  try {
    return await Project.findOneAndDelete({ _id: projectId, userId }).exec();
  } catch (error) {
    throw new Error('Failed to delete project');
  }
};
