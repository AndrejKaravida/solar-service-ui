export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  UNAUTHORIZED = "unauthorized",
}
