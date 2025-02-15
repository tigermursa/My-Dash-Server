import { Model } from 'mongoose';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';

export interface UserWithStatic extends Model<IUser> {
  isUserExists(id: string): Promise<IUser | null>;
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email });
}

export async function createUser(userData: Partial<IUser>): Promise<IUser> {
  const newUser = new User(userData);
  return newUser.save();
}

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret',
      (err, decoded) => {
        if (err) return reject(new Error('Invalid or expired token'));
        resolve(decoded);
      },
    );
  });

export const AuthService = {
  findUserByEmail,
  createUser,
};
