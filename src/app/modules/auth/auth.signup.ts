import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { AuthService } from './auth.services';
import { validateUser } from './auth.zodValidation';
import { CustomError } from '../../Error/CustomError';
import { IUser } from '../user/user.interface';
import { NavItem } from '../nav-items/nav-item.modal';
import { generateDefaultNavItems } from '../../data/defaultNavItems';
import NotepadModel from '../notepad/notepad.model';

export const signup: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Validate input using Zod
    const validationResult = validateUser(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.errors });
      return;
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

    // Generate default nav items for the user
    const defaultNavItems = generateDefaultNavItems(newUser._id);
    await NavItem.insertMany(defaultNavItems);

    // Create default Notepad for user
    await NotepadModel.create({
      userId: newUser._id,
      contentNotePad: 'write your note',
      contentIdea: 'write your idea',
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      'mysecretjwtkey', // HARDCODED SECRET (Replace with ENV in production)
      { expiresIn: '1d' },
    );

    // Set JWT in cookies
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000,
    });

    res.status(201).json({
      message: 'User registered successfully!',
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });

    return;
  } catch (error) {
    next(error);
  }
};
