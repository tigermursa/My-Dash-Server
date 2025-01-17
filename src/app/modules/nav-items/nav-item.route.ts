import { Router } from 'express';
import {
  createNavItemController,
  getAllNavItemsController,
  getNavItemByIDController,
  deleteNavItemByIDController,
  updateNavItemByIDController,
  toggleNavItemController,
} from './nav-item.controller';

const navItemRoutes = Router();

// Create a nav item
navItemRoutes.post('/create-nav-item', createNavItemController);

// Get all nav items
navItemRoutes.get('/get-all-nav-items', getAllNavItemsController);

// Get a single nav item by ID
navItemRoutes.get('/get-nav-item/:id', getNavItemByIDController);

// Delete a nav item by ID
navItemRoutes.delete('/delete-nav-item/:id', deleteNavItemByIDController);

// Update a nav item by ID
navItemRoutes.put('/update-nav-item/:id', updateNavItemByIDController);

// Route to toggle user delete status
navItemRoutes.patch('/toggle-show/:id', toggleNavItemController);

export default navItemRoutes;
