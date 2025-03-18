import { Router } from 'express';
import {
  createDutySchedule,
  getAllDutySchedules,
  updateDutySchedule,
} from './dutyTime.controller';

const DutyTimeRoutes = Router();

DutyTimeRoutes.post('/create', createDutySchedule);
DutyTimeRoutes.get('/get-all', getAllDutySchedules);
DutyTimeRoutes.put('/update/:id', updateDutySchedule);

export default DutyTimeRoutes;
