export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  isDeleted?: boolean;
}
