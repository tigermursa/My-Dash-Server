import mongoose, { Schema, Document } from 'mongoose';

// Define AllTasksDocument (Subdocument Schema)
export interface AllTasksDocument extends Document {
  _id: mongoose.Types.ObjectId; // Mongoose automatically assigns this
  text: string;
  important: boolean;
  isCompleted: boolean;
}

// Define Main TasksDocument Schema
export interface TasksDocument extends Document {
  userID: string;
  title: 'todo' | 'week' | 'month' | 'year'; // Ensure enum type safety
  tasks: mongoose.Types.DocumentArray<AllTasksDocument>;
}

// Define AllTasks Schema (Embedded Subdocument)
const AllTasksSchema = new Schema<AllTasksDocument>({
  text: { type: String, required: true },
  important: { type: Boolean, required: true },
  isCompleted: { type: Boolean, required: true },
});

// Define Main Tasks Schema
const TasksSchema = new Schema<TasksDocument>({
  userID: { type: String, required: true },
  title: {
    type: String,
    required: true,
    enum: ['todo', 'week', 'month', 'year'],
  },
  tasks: { type: [AllTasksSchema], required: true },
});

const TasksModel = mongoose.model<TasksDocument>('Tasks', TasksSchema);
export default TasksModel;
