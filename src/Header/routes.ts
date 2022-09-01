import { UserRole } from "../Models/IUser";
import {
  allInvestmentsRoute,
  homeRoute,
  howItWorksRoute,
  mapRoute,
  myInvestmentsRoute,
} from "../routes";

export const routes = [
  {
    name: "Home",
    navigationPath: homeRoute,
    userRoles: [UserRole.USER, UserRole.UNAUTHORIZED],
  },
  {
    name: "Add new Panel",
    navigationPath: "/new",
    userRoles: [UserRole.ADMIN],
  },
  {
    name: "Investments",
    navigationPath: allInvestmentsRoute,
    userRoles: [UserRole.ADMIN],
  },
  {
    name: "My Investments",
    navigationPath: myInvestmentsRoute,
    userRoles: [UserRole.USER],
  },
  {
    name: "Map",
    navigationPath: mapRoute,
    userRoles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    name: "How it works",
    navigationPath: howItWorksRoute,
    userRoles: [UserRole.USER, UserRole.ADMIN, UserRole.UNAUTHORIZED],
  },
];
