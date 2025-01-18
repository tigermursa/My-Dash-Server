import mongoose, { Model } from 'mongoose';
import { INavItems } from './nav-item.interface';

// Define the nav-items schema
const navItemSchema = new mongoose.Schema<INavItems>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  href: { type: String, required: true },
  group: { type: String, required: true },
  status: { type: String, required: true, default: 'on' },
  isShow: {
    type: Boolean,
    required: false,
    default: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with User
});

// Compile the schema into a model
export const NavItem: Model<INavItems> = mongoose.model<INavItems>(
  'NavItem',
  navItemSchema,
);
