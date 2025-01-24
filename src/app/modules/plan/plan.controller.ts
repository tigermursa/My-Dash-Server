import { Request, Response } from 'express';
import {
  createTask,
  toggleTaskImportant,
  toggleTaskIsCompleted,
  removeTask,
  getTasks,
} from './plan.service';

export const createTaskHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID, task } = req.body;

    if (!userID || !task) {
      res
        .status(400)
        .json({ success: false, error: 'Missing userID or task data' });
      return;
    }

    const result = await createTask(userID, task);

    if (result.success) {
      res.status(201).json({
        success: true,
        data: result.data,
        message: 'Task created successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Unexpected error in createTaskHandler:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request',
    });
  }
};

export const toggleImportantHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userID, taskId } = req.body;
  const success = await toggleTaskImportant(userID, taskId);
  if (success) {
    res.status(200).send({ message: 'Task importance toggled successfully.' });
  } else {
    res.status(400).send({ message: 'Failed to toggle task importance.' });
  }
};

export const toggleIsCompletedHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userID, taskId } = req.body;
  const success = await toggleTaskIsCompleted(userID, taskId);
  if (success) {
    res.status(200).send({ message: 'Task completion toggled successfully.' });
  } else {
    res.status(400).send({ message: 'Failed to toggle task completion.' });
  }
};

export const deleteTaskHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userID, taskId } = req.body;
  const success = await removeTask(userID, taskId);
  if (success) {
    res.status(200).send({ message: 'Task deleted successfully.' });
  } else {
    res.status(400).send({ message: 'Failed to delete task.' });
  }
};

export const getTasksHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.params;

    if (!userID) {
      res.status(400).json({
        success: false,
        error: 'UserID is required in request parameters',
      });
      return;
    }

    const result = await getTasks(userID);

    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      res.status(result.error?.includes('not found') ? 404 : 500).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Unexpected error in getTasksHandler:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request',
    });
  }
};
