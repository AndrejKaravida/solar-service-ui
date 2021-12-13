import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cognitoRegister } from "../services/authentication";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onRegisterHandler = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const signUpResult = await cognitoRegister(email, password);
    localStorage.setItem("userSub", signUpResult.userSub);
    toast.success("You have successfully registered!");
    goToVerification();
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToVerification = () => {
    navigate("/verification");
  };

  return (
    <Card variant={"outlined"} className={styles.registerWrapper}>
      <h2 className={styles.registerText}>Register</h2>
      <div className={styles.inputElement}>
        <Input
          type="text"
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputElement}>
        <Input
          type="password"
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.inputElement}>
        <Input
          type="password"
          placeholder={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        variant={"contained"}
        className={styles.registerButton}
        onClick={onRegisterHandler}
      >
        Register
      </Button>
      <div className="text-center">
        <p>Already have an account?</p>
        <p>
          {" "}
          Click{" "}
          <span onClick={goToLogin} className={styles.link}>
            here
          </span>{" "}
          to login
        </p>
      </div>
    </Card>
  );
};
