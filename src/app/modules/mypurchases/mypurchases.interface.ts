import { Document } from 'mongoose';

export interface IProduct extends Document {
  id?: string;
  name: string;
  url: string;
  purchaseDate: Date;
  warranty?: string;
  guarantee?: string;
  price: string;
  usingDays: number;
}
