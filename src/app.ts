import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import { errorHandler } from './app/middleware/ErrorHangler';
import navItemRoutes from './app/modules/nav-items/nav-item.route';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import UserRoutes from './app/modules/user/user.routes';
import PlanROutes from './app/modules/plan/plan.routes';

const app: Application = express();

// Middleware for logging
app.use(morgan('dev')); // 'dev' outputs concise colored logs

// Enable CORS for all origins
app.use(
  cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true, // Allow credentials (cookies, authentication)
  }),
);

app.use(cookieParser()); // Cookie parser should be before route handling, but after CORS setup.

// Parsers
app.use(express.json());

// Routes
app.use('/api/v1/nav-items', navItemRoutes);
app.use('/api/v2/user', AuthRoutes);
app.use('/api/v2/user', UserRoutes);
app.use('/api/v3/plan', PlanROutes);

// Root route for serving status page
app.get('/', (_req: Request, res: Response) => {
  const filePath = path.join(process.cwd(), 'views', 'status.html');
  res.sendFile(filePath);
});

// Global error handling middleware should be placed at the end of the middleware stack
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err); // Log the error for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Error Handler (ensure it's last in the middleware stack)
app.use(errorHandler);

export default app;
