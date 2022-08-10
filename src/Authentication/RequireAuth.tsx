import { useAuth } from "./useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};
