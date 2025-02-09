import { Document } from 'mongoose';

export interface IExperience extends Document {
  userId: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}
