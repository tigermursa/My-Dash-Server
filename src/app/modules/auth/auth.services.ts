import { Model } from 'mongoose';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt, { VerifyErrors } from 'jsonwebtoken';
export interface UserWithStatic extends Model<IUser> {
  isUserExists(id: string): Promise<IUser | null>;
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email });
}

export async function createUser(userData: Partial<IUser>): Promise<IUser> {
  const newUser = new User(userData);
  return await newUser.save();
}

export const AuthService = {
  findUserByEmail,
  createUser,
};

// Verify token
export const verifyToken = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, 'mysecretjwtkey', (err, decoded) => {
      if (err) {
        return reject(new Error('Invalid or expired token'));
      }
      resolve(decoded);
    });
  });
};
