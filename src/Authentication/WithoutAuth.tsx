import { useAuth } from "./useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const WithoutAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    return <Navigate to="/mainScreen" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
