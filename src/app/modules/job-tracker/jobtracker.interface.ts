type ApplicationSource =
  | 'LinkedIn'
  | 'Company Website'
  | 'Indeed'
  | 'Referral'
  | 'Other';
type EmploymentType = 'remote' | 'onsite' | 'hybrid';
type InterestLevel = 1 | 2 | 3 | 4 | 5;
type ApplicationStatus =
  | 'pending'
  | 'interview'
  | 'rejected'
  | 'no_response'
  | 'offer';

export interface JobApplication {
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
