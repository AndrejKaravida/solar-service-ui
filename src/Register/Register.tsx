import { useState } from "react";
import { Button, Card, Input } from "@mui/material";
import styles from "./Register.module.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegisterHandler = () => {
    if (password !== confirmPassword) {
      return;
    }
    console.log(email, password, confirmPassword);
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
    </Card>
  );
};
