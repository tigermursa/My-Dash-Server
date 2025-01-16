import { INavItems } from './nav-item.interface';
import { NavItem } from './nav-item.modal';

// Create a new nav item
export const createNavItem = async (
  navItemData: Partial<INavItems>,
): Promise<INavItems> => {
  try {
    const navItem = new NavItem(navItemData);
    return await navItem.save();
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('This ID is already in use.');
    }
    throw error;
  }
};

// Get all nav items
export const getAllNavItems = async (): Promise<INavItems[]> => {
  return await NavItem.find({});
};

// Get a nav item by ID
export const getNavItemByID = async (id: string): Promise<INavItems | null> => {
  return await NavItem.findOne({ id });
};

// Delete a nav item by ID
export const deleteNavItemByID = async (
  id: string,
): Promise<INavItems | null> => {
  return await NavItem.findOneAndDelete({ id });
};

// Update a nav item by ID
export const updateNavItemByID = async (
  id: string,
  updateData: Partial<INavItems>,
): Promise<INavItems | null> => {
  return await NavItem.findOneAndUpdate({ id }, updateData, {
    new: true,
    runValidators: true,
  });
};
