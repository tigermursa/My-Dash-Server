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

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '30d';
    // Generate JWT token (HARDCODED EXPIRES IN)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
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
