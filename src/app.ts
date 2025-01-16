import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from "morgan";
import path from 'path';
import userRoutes from './app/modules/user/user.routes';
import { errorHandler } from './app/middleware/ErrorHangler';

const app: Application = express();

// Middleware for logging
app.use(morgan("dev"));  // 'dev' outputs concise colored logs

// Enable CORS for all origins
app.use(cors());

// Parsers
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
    const filePath = path.join(process.cwd(), 'views', 'status.html');
    res.sendFile(filePath);
});

// Global error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err); // Log the error for debugging
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Error Handler (ensure it's last)
app.use(errorHandler);

export default app;
