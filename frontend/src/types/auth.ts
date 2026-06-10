export interface LoginDataDto {
  email: string;
  password: string;
}

export interface RegisterDataDto {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  refreshToken: string;
}