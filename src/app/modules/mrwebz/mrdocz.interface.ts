export interface WebsiteDTO {
  id: string;
  name: string;
  url: string;
  isDeleted?: boolean;
  createdAt: string;
  category?: string;
}
