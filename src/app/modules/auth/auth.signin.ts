import { RequestHandler } from 'express';

import { CustomError } from '../../Error/CustomError';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { AuthService } from './auth.services';

export const signin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError('Email and password are required', 400);

    const user = await AuthService.findUserByEmail(email);
    if (!user) throw new CustomError('User not found', 404);
    if (!user.password) throw new CustomError('User password not found', 500);

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) throw new CustomError('Wrong credentials', 401);

    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

    const expiresIn = process.env.JWT_EXPIRES_IN || '30d';
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn,
    });
    const maxAge: number = (ms as unknown as (value: string) => number)(
      expiresIn,
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge,
    });

    res.status(200).json({
      message: 'User logged in successfully!',
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};
