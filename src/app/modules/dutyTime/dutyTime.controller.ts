import { Request, Response, NextFunction, RequestHandler } from 'express';
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
