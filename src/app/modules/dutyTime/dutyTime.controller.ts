import { Request, Response } from 'express';
import { WeeklyScheduleService } from './dutyTime.service';

export class WeeklyScheduleController {
  static async createWeeklySchedule(req: Request, res: Response) {
    try {
      const schedule = await WeeklyScheduleService.createWeeklySchedule(
        req.body,
      );
      res
        .status(201)
        .json({
          message: 'Weekly schedule created successfully',
          data: schedule,
        });
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: 'Error creating weekly schedule',
          error: error.message,
        });
    }
  }

  static async getAllWeeklySchedules(req: Request, res: Response) {
    try {
      const schedules = await WeeklyScheduleService.getAllWeeklySchedules();
      res
        .status(200)
        .json({
          message: 'Weekly schedules retrieved successfully',
          data: schedules,
        });
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: 'Error retrieving weekly schedules',
          error: error.message,
        });
    }
  }

  static async getDaySchedule(req: Request, res: Response) {
    try {
      const { day } = req.params;
      const daySchedule = await WeeklyScheduleService.getDaySchedule(day);
      res
        .status(200)
        .json({
          message: `Schedule for ${day} retrieved successfully`,
          data: daySchedule,
        });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateDaySchedule(req: Request, res: Response) {
    try {
      const { day } = req.params;
      const updateData = req.body;
      const updatedDaySchedule = await WeeklyScheduleService.updateDaySchedule(
        day,
        updateData,
      );
      res
        .status(200)
        .json({
          message: `Schedule for ${day} updated successfully`,
          data: updatedDaySchedule,
        });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
