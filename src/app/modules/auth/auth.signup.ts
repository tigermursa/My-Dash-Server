import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { AuthService } from './auth.services';
import { validateUser } from './auth.zodValidation';
import { CustomError } from '../../Error/CustomError';
import { IUser } from '../user/user.interface';

export const signup: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Validate input using Zod
    const validationResult = validateUser(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.errors });
      return; // Ensure the function returns here
    }

    // Check if user already exists
    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create user data
    const userData: Partial<IUser> = {
      username,
      email,
      password: hashedPassword,
    };

    // Save the user
    const newUser = await AuthService.createUser(userData);

    // Generate JWT token (HARDCODED EXPIRES IN)
    const token = jwt.sign(
      { id: newUser._id },
      'mysecretjwtkey', // HARDCODED SECRET (Replace with ENV in production)
      { expiresIn: '1d' }, // HARDCODED EXPIRATION (1 Day)
    );

    // **Set JWT in cookies (Fixed for Localhost)**
    res.cookie('access_token', token, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      secure: false, // Set to false because you're using HTTP (not HTTPS) in development
      sameSite: 'lax', // Allow cookies to be sent across different origins (needed for local development with different ports)
      maxAge: 3600000,
    });

    res.status(201).json({
      message: 'User registered successfully!',
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });

    return; // Ensure the function exits here
  } catch (error) {
    next(error);
  }
};
