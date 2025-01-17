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
export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({ error: 'Token expired', status: 401 });
          } else {
            reject({ error: 'Token invalid', status: 403 });
          }
        } else {
          resolve(decoded);
        }
      },
    );
  });
};
