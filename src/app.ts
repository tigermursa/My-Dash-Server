import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import navItemRoutes from './app/modules/nav-items/nav-item.route';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import UserRoutes from './app/modules/user/user.routes';
import NotepadRoutes from './app/modules/notepad/notepad.route';
import SkillRouter from './app/modules/skills/skill.routes';
import JobApplicationRouter from './app/modules/job-tracker/jobtracker.routes';
import BookmarkRouter from './app/modules/bookmarks/bookmarks.route';
import DateEventRouter from './app/modules/events/dateEvents.route';
import ExperienceRouter from './app/modules/experience/experience.routes';
import ProjectRouter from './app/modules/projects/project.route';
import PlanRoutes from './app/modules/plan/plan.routes';
import DutyTimeRoutes from './app/modules/dutyTime/dutyTime.routes';
import MrDoczROutes from './app/modules/mrdocz/mrdocz.routes';
import MrWebzRoutes from './app/modules/mrwebz/mrdocz.routes';
import MyPurchases from './app/modules/mypurchases/mypurchases.routes';

const app: Application = express();

// Middleware for logging
app.use(morgan('dev'));
app.use(
  cors({
    origin: [
      'https://my-dash-ten.vercel.app',
      'https://my-duty.vercel.app',
      'https://mrdocz.vercel.app',
      'https://mrwebz.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

// Existing routes
app.use('/api/v1/nav-items', navItemRoutes);
app.use('/api/v2/user', AuthRoutes);
app.use('/api/v2/user', UserRoutes);
app.use('/api/v3/plan', PlanRoutes);
app.use('/api/v4/notepad', NotepadRoutes);
app.use('/api/v5/skills', SkillRouter);
app.use('/api/v6/jobs', JobApplicationRouter);
app.use('/api/v7/bookmarks', BookmarkRouter);
app.use('/api/v8/events', DateEventRouter);
app.use('/api/v9/experience', ExperienceRouter);
app.use('/api/v10/project', ProjectRouter);
app.use('/api/v11/office', DutyTimeRoutes);
app.use('/api/v12/docs', MrDoczROutes);
app.use('/api/v13/webs', MrWebzRoutes);
app.use('/api/v14/taka', MyPurchases);

// Root route for serving status page
app.get('/', (_req: Request, res: Response) => {
  const filePath = path.join(process.cwd(), 'views', 'status.html');
  res.sendFile(filePath);
});

// Global error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
