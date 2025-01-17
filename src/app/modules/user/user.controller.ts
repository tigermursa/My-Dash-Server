import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  deleteUserByID,
  getDeletedUsers,
  getUserByID,
  toggleUserDeleteStatus,
  updateUserByID,
} from './user.service';

export const getUserByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await getUserByID(new Types.ObjectId(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await deleteUserByID(new Types.ObjectId(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserByID(new Types.ObjectId(id), req.body);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleUserDeleteStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await toggleUserDeleteStatus(new Types.ObjectId(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${user.isDeleted ? 'marked as deleted' : 'restored'}`,
    });
  } catch (error) {
    next(error);
  }
};

// New controller to fetch deleted users
export const getDeletedUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const deletedUsers = await getDeletedUsers();

    res.status(200).json({
      success: true,
      data: deletedUsers,
    });
  } catch (error) {
    next(error);
  }
};
