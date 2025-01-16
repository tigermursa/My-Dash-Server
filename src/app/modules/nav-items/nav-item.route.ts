import { Router } from 'express';
import {
  createNavItemController,
  getAllNavItemsController,
  getNavItemByIDController,
  deleteNavItemByIDController,
  updateNavItemByIDController,
} from './nav-item.controller';

const router = Router();

// Create a nav item
router.post('/create-nav-item', createNavItemController);

// Get all nav items
router.get('/get-all-nav-items', getAllNavItemsController);

// Get a single nav item by ID
router.get('/get-nav-item/:id', getNavItemByIDController);

// Delete a nav item by ID
router.delete('/delete-nav-item/:id', deleteNavItemByIDController);

// Update a nav item by ID
router.put('/update-nav-item/:id', updateNavItemByIDController);

export default router;
