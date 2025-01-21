export interface AllTasks {
  id: string;
  text: string;
  important: boolean;
  isCompleted: boolean;
}

export interface Tasks {
  userID: string;
  title: string; // "todo", "week", "month", "year"
  tasks: AllTasks[];
}
