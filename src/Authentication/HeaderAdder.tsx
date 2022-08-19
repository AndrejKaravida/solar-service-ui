import { Header } from "../Header/Header";
import { useAuth } from "./useAuth";
import { UserRole } from "../Models/IUser";

interface IProps {
  children: JSX.Element;
}

export const HeaderAdder = ({ children }: IProps) => {
  const { user } = useAuth();

  const userRole: UserRole = user ? user.role : UserRole.UNAUTHORIZED;

  return (
    <>
      <Header userRole={userRole} />
      {children}
    </>
  );
};
