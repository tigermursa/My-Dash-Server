import { Request, Response, NextFunction } from 'express';

export async function signout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({
      message: 'User has been logged out successfully!',
    });
  } catch (error) {
    next(error);
  }
}

// secure: process.env.NODE_ENV === 'production',
//       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
