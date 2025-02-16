import { Request, Response, RequestHandler } from 'express';
import {
  createTask,
  toggleTaskField,
  removeTask,
  getTasks,
  updateTaskText,
} from './plan.service';
import { ServiceResponse } from '../../types/plan';
import { determineStatusCode } from '../../Error/handleError';

// Generic response handler
const handleControllerResponse = (
  res: Response,
  result: ServiceResponse<any>,
) => {
  if (result.success) {
    res.status(result.message ? 200 : 201).json(result);
  } else {
    const statusCode = determineStatusCode(result.error);
    res.status(statusCode).json({
      success: false,
      error: result.error,
      message: result.message,
    });
  }
};

// Request validation middleware
const validateRequestParams = (
  req: Request,
  params: string[],
): string | null => {
  for (const param of params) {
    if (!req.body[param]) return `Missing required parameter: ${param}`;
  }
  return null;
};

// Create Task Handler
export const createTaskHandler: RequestHandler = async (req, res) => {
  const paramError = validateRequestParams(req, ['userID', 'task']);
  if (paramError) {
    res.status(400).json({ success: false, error: paramError });
    return;
  }

  const result = await createTask(req.body.userID, req.body.task);
  result.message = 'Task created successfully';
  handleControllerResponse(res, result);
};

// Toggle Field Handler Factory
export const toggleTaskFieldHandler = (field: string): RequestHandler => {
  return async (req, res) => {
    const paramError = validateRequestParams(req, ['userID', 'taskId']);
    if (paramError) {
      res.status(400).json({ success: false, error: paramError });
      return;
    }

    const result = await toggleTaskField(
      req.body.userID,
      req.body.taskId,
      field as any,
    );
    result.message = `Task ${field} updated successfully`;
    handleControllerResponse(res, result);
  };
};

// Delete Task Handler
export const deleteTaskHandler: RequestHandler = async (req, res) => {
  const paramError = validateRequestParams(req, ['userID', 'taskId']);
  if (paramError) {
    res.status(400).json({ success: false, error: paramError });
    return;
  }

  const result = await removeTask(req.body.userID, req.body.taskId);
  result.message = 'Task deleted successfully';
  handleControllerResponse(res, result);
};

// Get Tasks Handler
export const getTasksHandler: RequestHandler = async (req, res) => {
  const { userID } = req.params;
  if (!userID) {
    res.status(400).json({ success: false, error: 'Missing userID' });
    return;
  }

  const result = await getTasks(userID);

  if (result.success) {
    result.message = result.data.length
      ? 'Tasks retrieved successfully'
      : 'No tasks found for user';
  } else {
    result.message = result.message || 'Failed to retrieve tasks';
  }

  handleControllerResponse(res, result);
};

export const updateTaskTextHandler: RequestHandler = async (req, res) => {
  // Validate required parameters: userID, taskId, and text.
  const paramError = validateRequestParams(req, ['userID', 'taskId', 'text']);
  if (paramError) {
    res.status(400).json({ success: false, error: paramError });
    return;
  }

  const newText = req.body.text;

  // Call the service to update the task text.
  const result = await updateTaskText(
    req.body.userID,
    req.body.taskId,
    newText,
  );
  result.message = 'Task text updated successfully';
  handleControllerResponse(res, result);
};
