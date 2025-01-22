import mongoose from 'mongoose';
import TasksModel from './plan.model';
import { AllTasks, Tasks } from './plan.interface';

// Custom error classes for better error handling
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Utility function to validate ObjectId
const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

// Optimized CRUD Operations

export const createTask = async (
  userID: string,
  taskData: Omit<AllTasks, 'id'>,
): Promise<AllTasks> => {
  const newTaskId = new mongoose.Types.ObjectId();

  const updatedDocument = await TasksModel.findOneAndUpdate(
    { userID },
    {
      $push: {
        tasks: {
          _id: newTaskId,
          ...taskData,
        },
      },
    },
    {
      new: true,
      upsert: true,
      projection: { tasks: { $elemMatch: { _id: newTaskId } } },
    },
  ).lean();

  const createdTask = updatedDocument?.tasks[0];
  if (!createdTask) throw new Error('Task creation failed');

  return {
    id: createdTask._id.toString(),
    text: createdTask.text,
    important: createdTask.important,
    isCompleted: createdTask.isCompleted,
  };
};

export const toggleTaskState = async (
  userID: string,
  taskId: string,
  field: 'important' | 'isCompleted',
): Promise<AllTasks> => {
  if (!isValidObjectId(taskId)) {
    throw new ValidationError('Invalid task ID format');
  }

  const updatedDocument = await TasksModel.findOneAndUpdate(
    {
      userID,
      'tasks._id': taskId,
    },
    { $bit: { [`tasks.$.${field}`]: { xor: 1 } } },
    {
      new: true,
      projection: { tasks: { $elemMatch: { _id: taskId } } },
    },
  ).lean();

  if (!updatedDocument) {
    throw new NotFoundError('User or task not found');
  }

  const updatedTask = updatedDocument.tasks[0];
  return {
    id: updatedTask._id.toString(),
    text: updatedTask.text,
    important: updatedTask.important,
    isCompleted: updatedTask.isCompleted,
  };
};

export const removeTask = async (
  userID: string,
  taskId: string,
): Promise<void> => {
  if (!isValidObjectId(taskId)) {
    throw new ValidationError('Invalid task ID format');
  }

  const result = await TasksModel.findOneAndUpdate(
    { userID },
    { $pull: { tasks: { _id: taskId } } },
    { new: true },
  ).lean();

  if (!result) {
    throw new NotFoundError('User not found');
  }

  const taskExists = result.tasks.some((t) => t._id.toString() === taskId);
  if (taskExists) {
    throw new Error('Failed to delete task');
  }
};

export const getTasks = async (userID: string): Promise<AllTasks[]> => {
  const result = await TasksModel.findOne({ userID }, { tasks: 1 }).lean();

  if (!result) return [];

  return result.tasks.map((task) => ({
    id: task._id.toString(),
    text: task.text,
    important: task.important,
    isCompleted: task.isCompleted,
  }));
};
