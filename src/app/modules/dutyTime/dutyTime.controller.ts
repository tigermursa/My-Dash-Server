import { RequestHandler } from 'express';
import moment from 'moment-timezone';
import DutySchedule from './dutyTime.model';
import {
  createDutyScheduleService,
  getAllDutySchedulesService,
  updateDutyScheduleService,
} from './dutyTime.service';

export const createDutySchedule: RequestHandler = async (req, res, next) => {
  try {
    const duty = await createDutyScheduleService(req.body);
    res.status(201).json(duty);
  } catch (error) {
    next(error);
  }
};

export const getAllDutySchedules: RequestHandler = async (_req, res, next) => {
  try {
    const duties = await getAllDutySchedulesService();
    res.status(200).json(duties);
  } catch (error) {
    next(error);
  }
};

export const updateDutySchedule: RequestHandler = async (req, res, next) => {
  try {
    const duty = await updateDutyScheduleService(req.params.id, req.body);
    if (!duty) {
      res.status(404).json({ message: 'Duty not found' });
      return;
    }
    res.status(200).json(duty);
  } catch (error) {
    next(error);
  }
};

// auto updating date
export const updateAllDutySchedules: RequestHandler = async (
  _req,
  res,
  next,
) => {
  try {
    const userTimezone = 'Asia/Dhaka'; // +06 timezone, adjust if different
    const today = moment().tz(userTimezone);
    let nextSunday = today.clone().day(7); // Sunday of the current week
    if (nextSunday.isSameOrBefore(today, 'day')) {
      nextSunday.add(7, 'days'); // Move to next Sunday if today is Sunday or later
    }
    const workdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    for (const [index, day] of workdays.entries()) {
      const newDate = nextSunday
        .clone()
        .add(index, 'days')
        .format('YYYY-MM-DD');
      await DutySchedule.updateOne({ day }, { date: newDate });
    }
    res.status(200).json({ message: 'Duty schedules updated successfully' });
  } catch (error) {
    next(error);
  }
};
