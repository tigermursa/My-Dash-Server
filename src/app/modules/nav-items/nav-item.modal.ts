import mongoose, { Model } from 'mongoose';
import { INavItems } from './nav-item.interface';

// Define the nav-items schema
const navItemSchema = new mongoose.Schema<INavItems>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  href: { type: String, required: true },
  group: { type: String, required: true },
});

// Compile the schema into a model
export const NavItem: Model<INavItems> = mongoose.model<INavItems>(
  'NavItem',
  navItemSchema,
);
