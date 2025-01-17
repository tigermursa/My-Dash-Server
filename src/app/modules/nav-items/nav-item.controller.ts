import { Request, Response, NextFunction } from 'express';
import {
  createNavItem,
  deleteNavItemByID,
  getAllNavItems,
  getNavItemByID,
  toggleItemShowStatus,
  updateNavItemByID,
} from './nav-item.service';

// Create
export const createNavItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const navItem = await createNavItem(req.body);

    res.status(201).json({
      success: true,
      message: 'Nav item created successfully',
      data: navItem,
    });
  } catch (error: any) {
    if (error.message === 'This ID is already in use.') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

// Get All
export const getAllNavItemsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const navItems = await getAllNavItems();

    res.status(200).json({
      success: true,
      message: 'Nav items fetched successfully',
      total: navItems.length,
      data: navItems,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get Single
export const getNavItemByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const navItem = await getNavItemByID(id);

    if (!navItem) {
      return res.status(404).json({
        success: false,
        message: 'Nav item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Nav item fetched successfully',
      data: navItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteNavItemByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const navItem = await deleteNavItemByID(id);

    if (!navItem) {
      return res.status(404).json({
        success: false,
        message: 'Nav item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Nav item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

//Update
export const updateNavItemByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedNavItem = await updateNavItemByID(id, req.body);

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
