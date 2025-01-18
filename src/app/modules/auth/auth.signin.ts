import { RequestHandler } from 'express';
import { AuthService } from './auth.services';
import { CustomError } from '../../Error/CustomError';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      throw new CustomError('Email and password are required', 400);
    }

    // Find user by email
    const validUser = await AuthService.findUserByEmail(email);
    if (!validUser) {
      throw new CustomError('User not found', 404);
    }

    // Ensure the password field exists in the database
    if (!validUser.password) {
      throw new CustomError('User password not found in database', 500);
    }

    // Check if the password matches
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw new CustomError('Wrong credentials', 401);
    }

    // Generate JWT token (HARDCODED EXPIRES IN)
    const token = jwt.sign(
      { id: validUser._id },
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

    res.status(200).json({
      message: 'User logged in successfully!',
      _id: validUser._id,
      username: validUser.username,
      email: validUser.email,
    });
  } catch (error) {
    next(error);
  }
};
