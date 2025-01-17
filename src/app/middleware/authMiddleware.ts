import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../modules/auth/auth.services';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      res
        .status(401)
        .json({ message: 'Unauthorized: Access token is required.' });
      return;
    }

    const decoded = await verifyToken(token);
    (req as any).user = decoded;

    next();
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Unauthorized: Invalid or expired token.' });
    return;
  }
};
