import TasksModel, { AllTasksDocument } from './plan.model';
import { AllTasks } from './plan.interface';
import mongoose from 'mongoose';

export type TaskResponse = {
  id: string;
  text: string;
  title: 'todo' | 'week' | 'month' | 'year';
  important: boolean;
  isCompleted: boolean;
};

type ServiceResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; message?: string };

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
): Promise<ServiceResponse<TaskResponse>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });

    if (!userTasks) {
      return {
        success: false,
        error: 'User not found',
        message: 'No tasks document exists for this user',
      };
    }

    const task = userTasks.tasks.id(taskId);
    if (!task) {
      return {
        success: false,
        error: 'Task not found',
        message: 'The specified task does not exist',
      };
    }

    task.important = !task.important;
    await userTasks.save();

    const responseData: TaskResponse = {
      id: task._id.toString(),
      text: task.text,
      title: task.title,
      important: task.important,
      isCompleted: task.isCompleted,
    };

    return {
      success: true,
      data: responseData,
      message: 'Task importance updated successfully',
    };
  } catch (error) {
    console.error('Error toggling task importance:', error);

    if (error instanceof mongoose.Error.CastError) {
      return {
        success: false,
        error: 'Invalid task ID format',
        message: 'The provided task ID is malformed',
      };
    }

    if (error instanceof mongoose.Error) {
      return {
        success: false,
        error: 'Database operation failed',
        message: 'Error saving task changes',
      };
    }

    return {
      success: false,
      error: 'Internal server error',
      message: 'Unexpected error occurred',
    };
  }
};

// ✅ TOGGLE TASK COMPLETION - Toggles task's "isCompleted" state
export const toggleTaskIsCompleted = async (
  userID: string,
  taskId: string,
): Promise<ServiceResponse<TaskResponse>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });

    if (!userTasks) {
      return {
        success: false,
        error: 'User not found',
        message: 'No tasks document exists for this user',
      };
    }

    const task = userTasks.tasks.id(taskId);
    if (!task) {
      return {
        success: false,
        error: 'Task not found',
        message: 'The specified task does not exist',
      };
    }

    task.isCompleted = !task.isCompleted;
    await userTasks.save();

    const responseData: TaskResponse = {
      id: task._id.toString(),
      text: task.text,
      title: task.title,
      important: task.important,
      isCompleted: task.isCompleted,
    };

    return {
      success: true,
      data: responseData,
      message: 'Task completion status updated successfully',
    };
  } catch (error) {
    console.error('Error toggling task completion:', error);

    if (error instanceof mongoose.Error.CastError) {
      return {
        success: false,
        error: 'Invalid task ID format',
        message: 'The provided task ID is malformed',
      };
    }

    if (error instanceof mongoose.Error) {
      return {
        success: false,
        error: 'Database operation failed',
        message: 'Error saving task changes',
      };
    }

    return {
      success: false,
      error: 'Internal server error',
      message: 'Unexpected error occurred',
    };
  }
};

// ✅ REMOVE TASK - Deletes a task from user's task list
export const removeTask = async (
  userID: string,
  taskId: string,
): Promise<ServiceResponse<{ deletedTaskId: string }>> => {
  try {
    const userTasks = await TasksModel.findOne({ userID });

    if (!userTasks) {
      return {
        success: false,
        error: 'User not found',
        message: 'No tasks document exists for this user',
      };
    }

    const task = userTasks.tasks.id(taskId);
    if (!task) {
      return {
        success: false,
        error: 'Task not found',
        message: 'The specified task does not exist',
      };
    }

    userTasks.tasks.pull(taskId);
    await userTasks.save();

    return {
      success: true,
      data: { deletedTaskId: taskId },
      message: 'Task deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting task:', error);

    if (error instanceof mongoose.Error.CastError) {
      return {
        success: false,
        error: 'Invalid task ID format',
        message: 'The provided task ID is malformed',
      };
    }

    if (error instanceof mongoose.Error) {
      return {
        success: false,
        error: 'Database operation failed',
        message: 'Error removing task',
      };
    }

    return {
      success: false,
      error: 'Internal server error',
      message: 'Unexpected error occurred',
    };
  }
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
