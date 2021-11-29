import { useState } from "react";
import { Button, Card, Input } from "@mui/material";
import styles from "./Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = () => {
    console.log(email, password);
  };

  return (
    <Card variant={"outlined"} className={styles.loginWrapper}>
      <h2 className={styles.loginText}>Login</h2>
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
      <Button
        variant={"contained"}
        className={styles.loginButton}
        onClick={onLoginHandler}
      >
        Login
      </Button>
    </Card>
  );
};
