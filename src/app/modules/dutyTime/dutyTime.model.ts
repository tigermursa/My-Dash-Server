import mongoose, { Document, Schema, Model } from 'mongoose';
import {
  IWeeklySchedule,
  ITimePeriod,
  ISession,
  IDaySchedule,
} from './dutyTime.interface';

// Extend the IWeeklySchedule interface with Mongoose Document properties.
export interface IWeeklyScheduleDocument extends IWeeklySchedule, Document {}

// Sub-schema for a time period.
const TimePeriodSchema: Schema<ITimePeriod> = new Schema(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  { _id: false },
);

// Sub-schema for a session.
const SessionSchema: Schema<ISession> = new Schema(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
    type: {
      type: String,
      enum: ['morning', 'afternoon', 'night'],
      required: true,
    },
  },
  { _id: false },
);

// Sub-schema for a day schedule.
const DayScheduleSchema: Schema<IDaySchedule> = new Schema(
  {
    day: {
      type: String,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: true,
    },
    isOff: { type: Boolean, required: true },
    sessions: { type: [SessionSchema], default: [] },
    groupMonitoring: { type: TimePeriodSchema, required: false },
  },
  { _id: false },
);

// Main schema for the weekly schedule.
const WeeklyScheduleSchema: Schema<IWeeklyScheduleDocument> = new Schema({
  days: { type: [DayScheduleSchema], required: true },
});

// Mongoose model.
export const WeeklyScheduleModel: Model<IWeeklyScheduleDocument> =
  mongoose.model<IWeeklyScheduleDocument>(
    'WeeklySchedule',
    WeeklyScheduleSchema,
  );
