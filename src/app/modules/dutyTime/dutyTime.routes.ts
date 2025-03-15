import { Router } from 'express';
import { WeeklyScheduleController } from './dutyTime.controller';

const DutyTimeRoutes = Router();

DutyTimeRoutes.post(
  '/weekly-schedules',
  WeeklyScheduleController.createWeeklySchedule,
);
DutyTimeRoutes.get(
  '/weekly-schedules',
  WeeklyScheduleController.getAllWeeklySchedules,
);
DutyTimeRoutes.get(
  '/weekly-schedules/day/:day',
  WeeklyScheduleController.getDaySchedule,
);
DutyTimeRoutes.put(
  '/weekly-schedules/day/:day',
  WeeklyScheduleController.updateDaySchedule,
);

export default DutyTimeRoutes;
