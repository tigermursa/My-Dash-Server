import { Schema, model, Document } from 'mongoose';
import { IProduct } from './mypurchases.interface';

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  warranty: { type: String },
  guarantee: { type: String },
  price: { type: String, required: true },
});

ProductSchema.virtual('usingDays').get(function (this: IProduct) {
  const now = new Date();
  const diffTime = now.getTime() - this.purchaseDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

export const Product = model<IProduct>('Product', ProductSchema);
