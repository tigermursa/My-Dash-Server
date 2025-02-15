import { Document } from 'mongoose';

export interface IDateEvent extends Document {
  userId: string;
  eventName: string;
  eventDate: string;
  dayLeft: number;
}
