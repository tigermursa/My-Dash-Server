import TasksModel from './plan.model';
import { AllTasks } from './plan.interface';
import mongoose from 'mongoose';

// ✅ CREATE TASK - Adds a task to user's tasks list
export const createTask = async (
  userID: string,
  task: AllTasks,
): Promise<boolean> => {
  const userTasks = await TasksModel.findOne({ userID });

  if (userTasks) {
    // Create a new subdocument inside the existing document
    const newTask = userTasks.tasks.create({
      ...task,
      _id: new mongoose.Types.ObjectId(),
    });

    userTasks.tasks.push(newTask);
    await userTasks.save();
    return true;
  }

  return false;
};

// ✅ TOGGLE TASK IMPORTANT - Toggles task's "important" state
export const toggleTaskImportant = async (
  userID: string,
  taskId: string,
): Promise<boolean> => {
  const userTasks = await TasksModel.findOne({ userID });

  if (userTasks) {
    const task = userTasks.tasks.id(taskId); // Get subdocument
    if (task) {
      task.important = !task.important;
      await userTasks.save();
      return true;
    }
  }
  return false;
};

// ✅ TOGGLE TASK COMPLETION - Toggles task's "isCompleted" state
export const toggleTaskIsCompleted = async (
  userID: string,
  taskId: string,
): Promise<boolean> => {
  const userTasks = await TasksModel.findOne({ userID });

  if (userTasks) {
    const task = userTasks.tasks.id(taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
      await userTasks.save();
      return true;
    }
  }
  return false;
};

// ✅ REMOVE TASK - Deletes a task from user's task list
export const removeTask = async (
  userID: string,
  taskId: string,
): Promise<boolean> => {
  const userTasks = await TasksModel.findOne({ userID });

  if (userTasks) {
    userTasks.tasks.pull(taskId); // Mongoose method to remove subdocument
    await userTasks.save();
    return true;
  }
  return false;
};

// ✅ GET ALL TASKS - Retrieves all tasks for a user
export const getTasks = async (
  userID: string,
): Promise<AllTasks[] | undefined> => {
  const userTasks = await TasksModel.findOne({ userID });

  if (!userTasks) return undefined;

  return userTasks.tasks.map((task) => ({
    id: task._id.toString(), // Convert _id to id
    text: task.text,
    important: task.important,
    isCompleted: task.isCompleted,
  }));
};
