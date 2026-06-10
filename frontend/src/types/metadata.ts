export interface PageMetadataReadDto {
  metaTitle: string;
  metaDescription?: string;
  slug?: string;
  openGraphImageUrl?: string;
}

export interface PageMetadataCreateDto {
  metaTitle: string;
  metaDescription?: string;
  slug?: string;
  openGraphImageUrl?: string;
}

export interface PageMetadataUpdateDto {
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  openGraphImageUrl?: string;
}