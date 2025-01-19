import { Request, Response, NextFunction } from 'express';
import {
  getNavItemsByUserID,
  toggleItemShowStatus,
  updateNavItemByID,
} from './nav-item.service';

//Update
export const updateNavItemByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params; // Extract navItemId from the URL
    const userId = req.user?.id; // Extract userId from the decoded JWT token

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedNavItem = await updateNavItemByID(userId, id, req.body);

    if (!updatedNavItem) {
      return res.status(404).json({
        success: false,
        message: 'Nav item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Nav item updated successfully',
      data: updatedNavItem,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleNavItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const data = await toggleItemShowStatus(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Navitem not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Navitem ${data.isShow ? 'marked as hidden' : 'restored'}`,
    });
  } catch (error) {
    next(error);
  }
};

// Get all nav items for a specific user by user ID
export const getNavItemsByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { userId } = req.params;
    const navItems = await getNavItemsByUserID(userId);

    if (!navItems || navItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No navigation items found for the user',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Navigation items fetched successfully',
      total: navItems.length,
      data: navItems,
    });
  } catch (error) {
    next(error);
  }
};
