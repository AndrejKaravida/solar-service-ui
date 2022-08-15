import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/useAuth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const onLoginHandler = async () => {
    try {
      await auth.signIn(email, password);
      toast.success("Successfully logged in!");
    } catch (e: any) {
      toast.warning(e.message);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ paddingTop: "200px" }}>
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
        <div className="text-center">
          <p>Don't have an account?</p>
          <p>
            {" "}
            Click{" "}
            <span onClick={goToRegister} className={styles.link}>
              here
            </span>{" "}
            to register
          </p>
        </div>
      </Card>
    </div>
  );
};
