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
      secure: false, // Set to false because you're using HTTP (not HTTPS) in development
      sameSite: 'lax', // Allow cookies to be sent across different origins (needed for local development with different ports)
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
