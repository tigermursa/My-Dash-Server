import { Request, Response, NextFunction } from 'express';

export async function signout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Clear the cookie
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Adjust for environment
    });

    // Send response
    res.status(200).json({
      message: 'User has been logged out successfully!',
    });

    return; // Ensure the function explicitly returns here
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
}
