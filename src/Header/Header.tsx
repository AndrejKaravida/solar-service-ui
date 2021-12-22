import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cognitoSignOut } from "../services/authentication";
import styles from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await cognitoSignOut();
      navigate("/login");
      toast.success("Successfully logged out");
    } catch (e: any) {
      toast.error("Error while signing out");
    }
  };

  return (
    <div className={styles.header}>
      <p className={styles.name}>Solar panels</p>

      <p
        className={`${styles.logout} ${styles.name} cursor-pointer`}
        onClick={logout}
      >
        Logout
      </p>
    </div>
  );
};
