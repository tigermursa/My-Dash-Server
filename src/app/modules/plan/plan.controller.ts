import { Request, Response } from 'express';
import {
  createTask,
  toggleTaskState,
  removeTask,
  getTasks,
  NotFoundError,
  ValidationError,
} from './plan.service';

// Generic error handler
const handleError = (res: Response, error: unknown) => {
  if (error instanceof ValidationError) {
    return res
      .status(400)
      .json({ code: 'VALIDATION_ERROR', message: error.message });
  }
  if (error instanceof NotFoundError) {
    return res.status(404).json({ code: 'NOT_FOUND', message: error.message });
  }
  console.error(error);
  res
    .status(500)
    .json({ code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' });
};

// Request validation middleware could be added here

export const createTaskHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.params;
    const taskData = req.body;

    const createdTask = await createTask(userID, taskData);
    res.status(201).json({
      code: 'TASK_CREATED',
      data: createdTask,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const toggleStateHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID, taskId } = req.params;
    const { field } = req.query;

    // Validate field parameter
    if (!['important', 'isCompleted'].includes(field as string)) {
      res.status(400).json({
        code: 'INVALID_FIELD',
        message: 'Field must be either "important" or "isCompleted"',
      });
      return; // Exit the function after sending response
    }

    const updatedTask = await toggleTaskState(
      userID,
      taskId,
      field as 'important' | 'isCompleted',
    );

    res.status(200).json({
      code: 'TASK_UPDATED',
      data: updatedTask,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTaskHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID, taskId } = req.params;

    await removeTask(userID, taskId);
    res.status(204).end();
  } catch (error) {
    handleError(res, error);
  }
};

export const getTasksHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userID } = req.params;
    const tasks = await getTasks(userID);
    res.status(200).json({
      code: 'TASKS_FOUND',
      data: tasks,
    });
  } catch (error) {
    handleError(res, error);
  }
};
