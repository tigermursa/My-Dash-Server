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

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.EXPIRES_IN },
    );

    // Set HTTP-only, Secure, and SameSite cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
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
