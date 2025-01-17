import { Router } from 'express';
import {
  getUserByIDController,
  deleteUserByIDController,
  updateUserByIDController,
  toggleUserDeleteStatusController,
  getDeletedUsersController,
} from './user.controller';

const UserRoutes = Router(); // Define the routes as UserRoutes

// Get a single user by ID (from MongoDB _id)
UserRoutes.get('/get-user/:id', getUserByIDController);

// Delete a user by ID (from MongoDB _id)
UserRoutes.delete('/delete-user/:id', deleteUserByIDController);

// Update a user by ID (from MongoDB _id)
UserRoutes.put('/update-user/:id', updateUserByIDController);

// Route to toggle user delete status by ID (from MongoDB _id)
UserRoutes.patch('/user/:id/toggle-delete', toggleUserDeleteStatusController);

// Route to get deleted users
UserRoutes.get('/users/deleted', getDeletedUsersController);

export default UserRoutes; // Export the UserRoutes as the default export
