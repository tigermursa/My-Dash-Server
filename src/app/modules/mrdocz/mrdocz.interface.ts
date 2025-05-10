export interface DocumentDTO {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  category?: string;
  isDeleted?: boolean;
}
