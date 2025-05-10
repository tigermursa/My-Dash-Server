import { DocumentDTO } from './mrdocz.interface';
import { DocumentMongoose, DocumentModel } from './mrdocz.model';

export class DocumentService {
  static async create(
    payload: Omit<DocumentDTO, 'id' | 'createdAt'>,
  ): Promise<DocumentDTO> {
    const doc = new DocumentMongoose(payload);
    await doc.save();
    const js = doc.toJSON() as DocumentModel & { id: string };
    return {
      id: js.id,
      name: js.name,
      url: js.url,
      createdAt: js.createdAt.toISOString(),
      category: js.category,
    };
  }

  static async getAll(): Promise<DocumentDTO[]> {
    const docs = await DocumentMongoose.find().sort({ createdAt: -1 });
    return docs.map((doc) => {
      const js = doc.toJSON() as DocumentModel & { id: string };
      return {
        id: js.id,
        name: js.name,
        url: js.url,
        createdAt: js.createdAt.toISOString(),
        category: js.category,
      };
    });
  }

  static async getById(id: string): Promise<DocumentDTO | null> {
    const doc = await DocumentMongoose.findById(id);
    if (!doc) return null;
    const js = doc.toJSON() as DocumentModel & { id: string };
    return {
      id: js.id,
      name: js.name,
      url: js.url,
      createdAt: js.createdAt.toISOString(),
      category: js.category,
    };
  }

  static async updateById(
    id: string,
    update: Partial<Omit<DocumentDTO, 'id' | 'createdAt'>>,
  ): Promise<DocumentDTO | null> {
    const doc = await DocumentMongoose.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!doc) return null;
    const js = doc.toJSON() as DocumentModel & { id: string };
    return {
      id: js.id,
      name: js.name,
      url: js.url,
      createdAt: js.createdAt.toISOString(),
      category: js.category,
    };
  }

  static async deleteById(id: string): Promise<boolean> {
    const res = await DocumentMongoose.findByIdAndDelete(id);
    return res != null;
  }

  static async markAsDeleted(id: string): Promise<boolean> {
    const updated = await DocumentMongoose.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    return updated != null;
  }
}
