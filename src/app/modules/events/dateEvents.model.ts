import mongoose, { Schema } from 'mongoose';
import { IDateEvent } from './dateEvents.interface';

const DateEventSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    eventName: { type: String, required: true },
    eventDate: { type: String, required: true },
    dayLeft: { type: Number, required: true },
  },
  { timestamps: true },
);

const DateEvent = mongoose.model<IDateEvent>('DateEvent', DateEventSchema);
export default DateEvent;
