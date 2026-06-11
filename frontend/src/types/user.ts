export interface UserReadDto {
  id: string;
  userName: string;
  email: string;
  role: string;
}

export interface ChangeRoleDto {
  newRole: string;
}