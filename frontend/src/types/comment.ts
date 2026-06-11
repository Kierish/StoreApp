export interface CommentReadDto {
  id: string;
  text: string;
  createdAt: string;
  productId: string;
  userId: string;
  userName: string;
}

export interface CommentCreateDto {
  text: string;
  productId: string;
}