import { useAuth } from "./useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";
import { UserRole } from "../Models/IUser";
import { Container } from "react-bootstrap";

interface IProps {
  userRoles: UserRole[];
  children: JSX.Element;
}

export const RequireAuth = (props: IProps) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!props.userRoles.includes(auth.user.role)) {
    const navigationPath =
      auth.user.role === UserRole.USER ? "/mainScreen" : "/addNewPanel";
    return <Navigate to={navigationPath} state={{ from: location }} replace />;
  }

  return (
    <>
      <Header userRole={auth.user.role} />
      <Container>{props.children}</Container>
    </>
  );
};
