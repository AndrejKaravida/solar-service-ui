export interface IUser {
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  UNAUTHORIZED = "unauthorized",
}
