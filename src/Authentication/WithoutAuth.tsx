import { useAuth } from "./useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "../Models/IUser";

export const WithoutAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    const navigationPath =
      auth.user.role === UserRole.USER ? "/mainScreen" : "/addNewPanel";
    return <Navigate to={navigationPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
