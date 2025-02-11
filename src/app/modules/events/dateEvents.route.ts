import { Router } from 'express';
import {
  getAllDateEvents,
  createDateEvent,
  updateDateEvent,
  deleteDateEvent,
} from './dateEvents.controller';

const DateEventRouter = Router();

DateEventRouter.get('/get/:userId', getAllDateEvents);
DateEventRouter.post('/create', createDateEvent);
DateEventRouter.put('/update/:id', updateDateEvent);
DateEventRouter.delete('/delete/:id', deleteDateEvent);

export default DateEventRouter;
