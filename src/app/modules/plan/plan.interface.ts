export interface IPlan {
  userId: string;
  title: string;
  type: 'todo' | 'week' | 'month' | 'year';
  tasks: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
