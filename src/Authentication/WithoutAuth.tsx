import { useAuth } from "./useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "../Models/IUser";
import { Header } from "../Header/Header";
import { homeRoute, newSolarPanelRoute } from "../routes";

export const WithoutAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    const navigationPath =
      auth.user.role === UserRole.USER ? homeRoute : newSolarPanelRoute;
    return <Navigate to={navigationPath} state={{ from: location }} replace />;
  }

  return (
    <>
      <Header userRole={UserRole.UNAUTHORIZED} />
      {children}
    </>
  );
};
