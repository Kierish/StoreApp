import type { PageMetadataCreateDto, PageMetadataReadDto, PageMetadataUpdateDto } from "./metaData";

export interface ProductReadDto {
  id: string;
  name: string;
  tagNames?: string[];
  categoryId: string;
  categoryName?: string;
  price: number;
  pageMetadata?: PageMetadataReadDto;
}

export interface ProductCreateDto {
  name: string;
  categoryName: string;
  price: number;
  tagNames?: string[];
  pageMetadata?: PageMetadataCreateDto;
}

export interface ProductUpdateDto {
  name?: string;
  categoryName?: string;
  price?: number;
  tagNames?: string[];
  pageMetadata?: PageMetadataUpdateDto;
}