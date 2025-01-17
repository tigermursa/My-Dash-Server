import { Router } from 'express';
import {
  getUserByIDController,
  deleteUserByIDController,
  updateUserByIDController,
  toggleUserDeleteStatusController,
  getDeletedUsersController,
} from './user.controller';
import { authenticateToken } from '../../middleware/authMiddleware';

const UserRoutes = Router();

UserRoutes.get('/get-user/:id', getUserByIDController);
UserRoutes.delete('/delete-user/:id', deleteUserByIDController);
UserRoutes.put('/update-user/:id', updateUserByIDController);
UserRoutes.patch('/user/:id/toggle-delete', toggleUserDeleteStatusController);
UserRoutes.get('/users/deleted', getDeletedUsersController);

export default UserRoutes;

//, authenticateToken
