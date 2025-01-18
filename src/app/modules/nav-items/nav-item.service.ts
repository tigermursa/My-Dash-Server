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

// Get all nav items sorted by id in ascending order
export const getAllNavItems = async (): Promise<INavItems[]> => {
  const navItems = await NavItem.find({});
  return navItems.sort((a, b) => Number(a.id) - Number(b.id)); // Convert id to number before sorting
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

//toggle show and hide
export const toggleItemShowStatus = async (
  id: string,
): Promise<INavItems | null> => {
  // Find the data and toggle the 'isShow' status
  const data = await NavItem.findOne({ id });

  if (data) {
    data.isShow = !data.isShow;
    await data.save(); // Save the updated data
  }

  return data;
};

// Get all nav items for a specific user
export const getNavItemsByUserID = async (
  userId: string,
): Promise<INavItems[]> => {
  try {
    const navItems = await NavItem.find({ userId });
    return navItems.sort((a, b) => Number(a.id) - Number(b.id)); // Sort by id if needed
  } catch (error) {
    throw new Error('Failed to fetch navigation items for the user');
  }
};
