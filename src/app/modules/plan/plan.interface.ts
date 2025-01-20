export interface ITask {
  id: string;
  text: string;
  completed: boolean;
}

export interface IPlan {
  userId: string;
  title: string;
  type: 'todo' | 'week' | 'month' | 'year';
  tasks: ITask[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
