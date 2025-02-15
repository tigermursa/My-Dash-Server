import { RequestHandler } from 'express';

import { CustomError } from '../../Error/CustomError';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { validateUser } from './auth.zodValidation';
import { AuthService } from './auth.services';

import { IUser } from '../user/user.interface';
import { NavItem } from '../nav-items/nav-item.modal';

import { generateDefaultNavItems } from '../../data/defaultNavItems';
import NotepadModel from '../notepad/notepad.model';
import TasksModel from '../plan/plan.model';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const parsed = validateUser(req.body);
    if (!parsed.success) {
      const errorMsg = parsed.error.errors.map((e) => e.message).join(', ');
      throw new CustomError(errorMsg, 400);
    }
    const { email, password, username } = parsed.data;

    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) throw new CustomError('User already exists', 409);

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await AuthService.createUser({
      email,
      password: hashedPassword,
      username,
    });

    // Generate default nav items for the user
    const defaultNavItems = generateDefaultNavItems(newUser._id);
    await NavItem.insertMany(defaultNavItems);

    // Create default Notepad for user
    await NotepadModel.create({
      userId: newUser._id,
      contentNotePad: 'write your note',
      contentIdea: 'write your idea',
    });

    // Create an empty TasksModel document for the new user

    await TasksModel.create([
      {
        userID: newUser._id,
        tasks: [],
      },
    ]);

    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

    const expiresIn = process.env.JWT_EXPIRES_IN || '30d';
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn,
    });
    const maxAge: number = (ms as unknown as (value: string) => number)(
      expiresIn,
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge,
    });

    res.status(201).json({
      message: 'User signed up successfully!',
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};
