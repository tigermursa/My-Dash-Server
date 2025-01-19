import { Router } from 'express';
import {
  updateNavItemByIDController,
  toggleNavItemController,
  getNavItemsByUserIDController,
} from './nav-item.controller';

import { authenticateToken } from '../../middleware/authMiddleware';

const navItemRoutes = Router();

// Update a nav item by ID
navItemRoutes.put(
  '/update-nav-item/:id',
  authenticateToken,
  updateNavItemByIDController,
);

// Route to toggle user delete status
navItemRoutes.patch(
  '/toggle-show/:id',
  authenticateToken,
  toggleNavItemController,
);

// Get all nav items for a specific user
navItemRoutes.get(
  '/get-nav-items-by-user/:userId',
  getNavItemsByUserIDController,
);

export default navItemRoutes;
