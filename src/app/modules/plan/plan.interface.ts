export interface AllTasks {
  id: string;
  title: string;
  text: string;
  important: boolean;
  isCompleted: boolean;
}

export interface Tasks {
  userID: string;
  tasks: AllTasks[];
}
