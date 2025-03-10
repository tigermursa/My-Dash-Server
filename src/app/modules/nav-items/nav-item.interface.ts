import mongoose from 'mongoose';

export interface INavItems extends Document {
  id: string;
  name: string;
  icon: string;
  href: string;
  group: string;
  status: string;
  isShow: boolean;
  userId: mongoose.Schema.Types.ObjectId;
}
