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
  userId: string,
  navItemId: string,
  updateData: Partial<INavItems>,
): Promise<INavItems | null> => {
  return await NavItem.findOneAndUpdate(
    { userId, id: navItemId }, // Match both userId from token and navItemId from URL
    updateData,
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation
    },
  );
};

//Toggle show and hide
export const toggleItemShowStatus = async (
  userId: string,
  navItemId: string,
): Promise<INavItems | null> => {
  // Find the nav item by userId and navItemId
  const data = await NavItem.findOne({ userId, id: navItemId });

  if (data) {
    data.isShow = !data.isShow; // Toggle the 'isShow' status
    await data.save(); // Save the updated data
  }

  return data;
};
