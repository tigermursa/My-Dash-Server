import { INavItems } from './nav-item.interface';
import { NavItem } from './nav-item.modal';

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

//Toggle show and hide
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
