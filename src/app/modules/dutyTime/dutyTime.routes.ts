import { Router } from 'express';
import {
  createDutySchedule,
  getAllDutySchedules,
  updateAllDutySchedules,
  updateDutySchedule,
} from './dutyTime.controller';

const DutyTimeRoutes = Router();

DutyTimeRoutes.post('/create', createDutySchedule);
DutyTimeRoutes.get('/get-all', getAllDutySchedules);
DutyTimeRoutes.put('/update/:id', updateDutySchedule);
DutyTimeRoutes.post('/update-schedule', updateAllDutySchedules);

export default DutyTimeRoutes;

//  "schedule": "59 17 * * 4"
