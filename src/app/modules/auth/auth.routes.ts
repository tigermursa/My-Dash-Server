import express from 'express';

import { signup } from './auth.signup';
import { signin } from './auth.signin';
import { signout } from './auth.signout';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/signin', signin);

// Logout route
router.post('/signout', signout);

export const AuthRoutes = router;
