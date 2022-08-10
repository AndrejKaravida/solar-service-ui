export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
