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
  try {
    const { userID, taskId } = req.body;

    if (!userID || !taskId) {
      res.status(400).json({
        success: false,
        error: 'Missing parameters',
        message: 'Both userID and taskId are required',
      });
      return;
    }

    const result = await toggleTaskImportant(userID, taskId);

    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      const statusCode =
        result.error === 'User not found'
          ? 404
          : result.error === 'Invalid task ID format'
            ? 400
            : 500;
      res.status(statusCode).json({
        success: false,
        error: result.error,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Unexpected error in toggleImportantHandler:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};

export const toggleIsCompletedHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID, taskId } = req.body;

    if (!userID || !taskId) {
      res.status(400).json({
        success: false,
        error: 'Missing parameters',
        message: 'Both userID and taskId are required',
      });
      return;
    }

    const result = await toggleTaskIsCompleted(userID, taskId);

    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      const statusCode =
        result.error === 'User not found'
          ? 404
          : result.error === 'Invalid task ID format'
            ? 400
            : 500;
      res.status(statusCode).json({
        success: false,
        error: result.error,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Unexpected error in toggleIsCompletedHandler:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};

//!delete
export const deleteTaskHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID, taskId } = req.body;

    if (!userID || !taskId) {
      res.status(400).json({
        success: false,
        error: 'Missing parameters',
        message: 'Both userID and taskId are required',
      });
      return;
    }

    const result = await removeTask(userID, taskId);

    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      const statusCode =
        result.error === 'User not found'
          ? 404
          : result.error === 'Invalid task ID format'
            ? 400
            : 500;
      res.status(statusCode).json({
        success: false,
        error: result.error,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Unexpected error in deleteTaskHandler:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
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
