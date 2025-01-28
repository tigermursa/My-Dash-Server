import { Document } from 'mongoose';

export type ApplicationSource =
  | 'LinkedIn'
  | 'Company Website'
  | 'Indeed'
  | 'Referral'
  | 'Other';
export type EmploymentType = 'remote' | 'onsite' | 'hybrid';
export type InterestLevel = 1 | 2 | 3 | 4 | 5;
export type ApplicationStatus =
  | 'pending'
  | 'interview'
  | 'rejected'
  | 'no_response'
  | 'offer';

// Extend the Mongoose Document interface with your JobApplication interface
export interface IJobApplication extends Document {
  id: string;
  company: string;
  position: string;
  skills: string[];
  location: string;
  type: EmploymentType;
  status: ApplicationStatus;
  salary: string;
  interest: InterestLevel;
  source: ApplicationSource;
  easyApply: boolean;
  appliedDate: string;
}
