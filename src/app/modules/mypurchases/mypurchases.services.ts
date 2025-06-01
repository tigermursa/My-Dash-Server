import { IProduct } from './mypurchases.interface';
import { Product } from './mypurchases.model';

export class MyPurchasesService {
  static async create(
    payload: Omit<IProduct, 'id' | 'usingDays'>,
  ): Promise<IProduct> {
    const product = new Product(payload);
    await product.save();
    return product.toJSON() as IProduct;
  }

  static async getAll(): Promise<IProduct[]> {
    const products = await Product.find().sort({ purchaseDate: -1 });
    return products.map((p) => p.toJSON() as IProduct);
  }

  static async getById(id: string): Promise<IProduct | null> {
    const product = await Product.findById(id);
    return product ? (product.toJSON() as IProduct) : null;
  }

  static async updateById(
    id: string,
    update: Partial<Omit<IProduct, 'id' | 'usingDays'>>,
  ): Promise<IProduct | null> {
    const updated = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    return updated ? (updated.toJSON() as IProduct) : null;
  }

  static async deleteById(id: string): Promise<boolean> {
    const deleted = await Product.findByIdAndDelete(id);
    return deleted != null;
  }
}
