import Card from "@mui/material/Card";
import { cognitoVerifyUser } from "../services/authentication.service";
import styles from "./VerificationCode.module.css";
import { useNavigate } from "react-router-dom";
import ReactCodeInput from "react-verification-code-input";
import { toast } from "react-toastify";

export const VerificationCode = () => {
  const navigate = useNavigate();

  const onConfirmHandler = async (value: string) => {
    try {
      const userSub = localStorage.getItem("userSub");
      if (userSub) {
        await cognitoVerifyUser(userSub, value);
        toast.success("Account confirmed successfully!");
        navigate("/login");
      }
    } catch (e: any) {
      toast.warning(e.message.toString());
    }
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <Card variant={"outlined"} className={styles.loginWrapper}>
        <h2 className={styles.loginText}>Verification Code</h2>
        <ReactCodeInput
          className={styles.marginMiddle}
          onComplete={onConfirmHandler}
        />
      </Card>
    </div>
  );
};
