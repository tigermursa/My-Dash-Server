import TasksModel, { AllTasksDocument } from './plan.model';
import { AllTasks } from './plan.interface';
import mongoose from 'mongoose';

type ServiceResponse<T> =
  | { success: true; data: T; message?: string } // Optional message for success
  | { success: false; error: string; message?: string }; // Optional message for errors

// ✅ CREATE TASK - Adds a task to user's tasks list
export const createTask = async (
  userID: string,
  task: Omit<AllTasksDocument, '_id'>,
): Promise<ServiceResponse<AllTasksDocument>> => {
  try {
    const userTasks = await TasksModel.findOneAndUpdate(
      { userID },
      { $setOnInsert: { userID, tasks: [] } },
      { new: true, upsert: true },
    );

    const newTask = userTasks.tasks.create({
      ...task,
      _id: new mongoose.Types.ObjectId(),
    });

    userTasks.tasks.push(newTask);
    await userTasks.save();

    return { success: true, data: newTask };
  } catch (error) {
    console.error('Error creating task:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message,
      );
      return {
        success: false,
        error: `Validation error: ${errorMessages.join(', ')}`,
      };
    }

    if (error instanceof mongoose.Error) {
      return { success: false, error: 'Database error occurred' };
    }

    return { success: false, error: 'Internal server error' };
  }
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
): Promise<ServiceResponse<AllTasks[]>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });

    if (!userTasks) {
      return {
        success: false,
        error: 'User not found or no tasks exist for this user',
      };
    }

    const tasks = userTasks.tasks.map((task) => ({
      id: task._id.toString(),
      text: task.text,
      title: task.title,
      important: task.important,
      isCompleted: task.isCompleted,
    }));

    return {
      success: true,
      data: tasks,
      message:
        tasks.length === 0
          ? 'User exists but no tasks found'
          : 'Tasks retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching tasks:', error);

    if (error instanceof mongoose.Error) {
      return {
        success: false,
        error: 'Database error occurred while fetching tasks',
      };
    }

    return {
      success: false,
      error: 'Unexpected error occurred while fetching tasks',
    };
  }
};
