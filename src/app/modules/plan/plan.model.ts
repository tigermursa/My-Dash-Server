import mongoose, { Schema, Document } from 'mongoose';

export interface AllTasksDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: 'todo' | 'week' | 'month' | 'year';
  text: string;
  important: boolean;
  isCompleted: boolean;
}

export interface TasksDocument extends Document {
  userID: string;
  tasks: mongoose.Types.DocumentArray<AllTasksDocument>;
}

const AllTasksSchema = new Schema<AllTasksDocument>({
  title: {
    type: String,
    enum: ['todo', 'week', 'month', 'year'],
    required: true,
  },
  text: { type: String, required: true },
  important: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const TasksSchema = new Schema<TasksDocument>({
  userID: { type: String, required: true },
  tasks: { type: [AllTasksSchema], required: true },
});

const TasksModel = mongoose.model<TasksDocument>('Tasks', TasksSchema);
export default TasksModel;
