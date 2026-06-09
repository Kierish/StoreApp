export interface PageMetadataReadDto {
  metaTitle: string;
  metaDescription?: string;
  slug?: string;
  openGraphImageUrl?: string;
}

export interface ProductReadDto {
  id: string;
  name: string;
  tagNames?: string[];
  categoryId: string;
  categoryName?: string;
  price: number;
  pageMetadata?: PageMetadataReadDto;
}