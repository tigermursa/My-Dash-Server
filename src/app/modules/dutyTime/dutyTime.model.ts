import mongoose, { Schema, Document } from 'mongoose';
import { IDutySchedule } from './dutyTime.interface';

const TimeSlotSchema: Schema = new Schema(
  {
    label: { type: String },
    startTime: { type: String },
    endTime: { type: String },
  },
  { _id: false },
);

const DutyScheduleSchema: Schema = new Schema({
  date: { type: String, required: true },
  day: { type: String, required: true },
  session1: { type: String, enum: ['morning', 'afternoon', 'night'] },
  session2: { type: String, enum: ['morning', 'afternoon', 'night', 'none'] },
  groupMonitoring: { type: TimeSlotSchema },
});

export default mongoose.model<IDutySchedule>(
  'DutySchedule',
  DutyScheduleSchema,
);
