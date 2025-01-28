import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript enums
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
export interface JobApplication extends Document {
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

// Create the Mongoose Schema
const JobApplicationSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Array of strings
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'], // Matches EmploymentType
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'interview', 'rejected', 'no_response', 'offer'], // Matches ApplicationStatus
      required: true,
    },
    salary: {
      type: String,
      required: true, // Optional field
    },
    interest: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // Matches InterestLevel
      required: true,
    },
    source: {
      type: String,
      enum: ['LinkedIn', 'Company Website', 'Indeed', 'Referral', 'Other'], // Matches ApplicationSource
      required: true,
    },
    easyApply: {
      type: Boolean,
      required: true,
    },
    appliedDate: {
      type: String, // ISO Date as string
      required: true,
    },
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Export the Mongoose model with the TypeScript interface
export default mongoose.model<JobApplication>(
  'JobApplication',
  JobApplicationSchema,
);
