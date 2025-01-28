export interface UserUtilities {
  userID: string;
  books: Book[];
  experiences: Experience[];
  bookmarks: Bookmark[];
  events: DateEvent[];
  projects: Project[];
}

export interface Book {
  id: number;
  name: string;
  totalPages: number;
  targetDate: string;
}

export interface Experience {
  id: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Bookmark {
  id: number;
  name: string;
  url: string;
}

export interface DateEvent {
  id: number;
  name: string; // Changed `eventName` to `name` for consistency
  date: string; // Changed `eventDate` to `date`
}

export interface Project {
  id: number;
  name: string; // Changed `projectName` to `name` for consistency
  category: 'frontend' | 'backend' | 'fullstack';
  github?: {
    client?: string;
    server?: string;
  };
  liveLink?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'planned' | 'in-progress' | 'completed';
}
