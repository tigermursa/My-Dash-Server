import mongoose from 'mongoose';

import TasksModel, { AllTasksDocument, TasksDocument } from './plan.model';
import { ITask, ServiceResponse, TaskResponse } from '../../types/plan';
import { handleServiceError } from '../../Error/handleError';

const getUserTasks = async (userID: string) => {
  return TasksModel.findOneAndUpdate(
    { userID },
    { $setOnInsert: { userID, tasks: [] } },
    { new: true, upsert: true },
  );
};

const formatTaskResponse = (task: TasksDocument['tasks'][0]): TaskResponse => ({
  id: task._id.toString(),
  text: task.text,
  title: task.title,
  important: task.important,
  isCompleted: task.isCompleted,
});

export const createTask = async (
  userID: string,
  taskData: Omit<TasksDocument['tasks'][0], '_id'>,
): Promise<ServiceResponse<TasksDocument['tasks'][0]>> => {
  try {
    const userTasks = await getUserTasks(userID);
    const newTask = userTasks.tasks.create({
      ...taskData,
      _id: new mongoose.Types.ObjectId(),
    });

    userTasks.tasks.push(newTask);
    await userTasks.save();
    return { success: true, data: newTask };
  } catch (error) {
    return handleServiceError(error);
  }
};

const modifyTask = async (
  userID: string,
  taskId: string,
  modifier: (task: TasksDocument['tasks'][0]) => void,
): Promise<ServiceResponse<TaskResponse>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });
    if (!userTasks) return { success: false, error: 'User not found' };

    const task = userTasks.tasks.id(taskId);
    if (!task) return { success: false, error: 'Task not found' };

    modifier(task);
    await userTasks.save();
    return { success: true, data: formatTaskResponse(task) };
  } catch (error) {
    return handleServiceError(error);
  }
};

export const toggleTaskField = (
  userID: string,
  taskId: string,
  field: keyof Pick<ITask, 'important' | 'isCompleted'>,
) =>
  modifyTask(userID, taskId, (task) => {
    task[field] = !task[field];
  });

export const removeTask = async (
  userID: string,
  taskId: string,
): Promise<ServiceResponse<{ deletedTaskId: string }>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });
    if (!userTasks) return { success: false, error: 'User not found' };

    const task = userTasks.tasks.id(taskId);
    if (!task) return { success: false, error: 'Task not found' };

    userTasks.tasks.pull(taskId);
    await userTasks.save();
    return { success: true, data: { deletedTaskId: taskId } };
  } catch (error) {
    return handleServiceError(error);
  }
};

export const getTasks = async (
  userID: string,
): Promise<ServiceResponse<TaskResponse[]>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });
    if (!userTasks) return { success: false, error: 'User not found' };

    const tasks = userTasks.tasks.map(formatTaskResponse);
    return { success: true, data: tasks };
  } catch (error) {
    return handleServiceError(error);
  }
};
