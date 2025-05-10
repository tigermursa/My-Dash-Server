import { WebsiteDTO } from './mrdocz.interface';
import { WebsiteMongoose, WebsiteModel } from './mrdocz.model';

export class WebsiteService {
  static async create(
    payload: Omit<WebsiteDTO, 'id' | 'createdAt'>,
  ): Promise<WebsiteDTO> {
    const site = new WebsiteMongoose(payload);
    await site.save();
    const js = site.toJSON() as WebsiteModel & { id: string };
    return {
      id: js.id,
      name: js.name,
      url: js.url,
      createdAt: js.createdAt.toISOString(),
      category: js.category,
      isDeleted: js.isDeleted,
    };
  }

  static async getAll(): Promise<WebsiteDTO[]> {
    const sites = await WebsiteMongoose.find().sort({ createdAt: -1 });
    return sites.map((site) => {
      const js = site.toJSON() as WebsiteModel & { id: string };
      return {
        id: js.id,
        name: js.name,
        url: js.url,
        createdAt: js.createdAt.toISOString(),
        category: js.category,
        isDeleted: js.isDeleted,
      };
    });
  }

  static async getById(id: string): Promise<WebsiteDTO | null> {
    const site = await WebsiteMongoose.findById(id);
    if (!site) return null;
    const js = site.toJSON() as WebsiteModel & { id: string };
    return {
      id: js.id,
      name: js.name,
      url: js.url,
      createdAt: js.createdAt.toISOString(),
      category: js.category,
      isDeleted: js.isDeleted,
    };
  }

  static async updateById(
    id: string,
    update: Partial<Omit<WebsiteDTO, 'id' | 'createdAt'>>,
  ): Promise<WebsiteDTO | null> {
    const site = await WebsiteMongoose.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!site) return null;
    const js = site.toJSON() as WebsiteModel & { id: string };
    return {
      id: js.id,
      name: js.name,
      url: js.url,
      createdAt: js.createdAt.toISOString(),
      category: js.category,
      isDeleted: js.isDeleted,
    };
  }

  static async deleteById(id: string): Promise<boolean> {
    const res = await WebsiteMongoose.findByIdAndDelete(id);
    return res != null;
  }

  static async markAsDeleted(id: string): Promise<boolean> {
    const updated = await WebsiteMongoose.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    return updated != null;
  }
}
