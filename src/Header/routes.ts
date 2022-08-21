import { UserRole } from "../Models/IUser";

export const routes = [
  {
    name: "Main Screen",
    navigationPath: "/mainScreen",
    userRoles: [UserRole.USER, UserRole.UNAUTHORIZED],
  },
  {
    name: "Add new Panel",
    navigationPath: "/addNewPanel",
    userRoles: [UserRole.ADMIN],
  },
  {
    name: "Investments",
    navigationPath: "/investments",
    userRoles: [UserRole.ADMIN],
  },
  {
    name: "My Investments",
    navigationPath: "/myInvestments",
    userRoles: [UserRole.USER],
  },
  {
    name: "Map",
    navigationPath: "/map",
    userRoles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    name: "How it works",
    navigationPath: "/howItWorks",
    userRoles: [UserRole.USER, UserRole.ADMIN, UserRole.UNAUTHORIZED],
  },
];
