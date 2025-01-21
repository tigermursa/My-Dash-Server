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
  const { userID, task } = req.body;
  const success = await createTask(userID, task);
  if (success) {
    res.status(201).send({ message: 'Task created successfully.' });
  } else {
    res.status(400).send({ message: 'Failed to create task.' });
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
  const { userID } = req.params;
  const tasks = await getTasks(userID);
  if (tasks) {
    res.status(200).send(tasks);
  } else {
    res.status(404).send({ message: 'Tasks not found.' });
  }
};
