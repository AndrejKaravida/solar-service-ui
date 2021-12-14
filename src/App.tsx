import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import Amplify from "aws-amplify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainScreen } from "./MainScreen/MainScreen";
import { VerificationCode } from "./VerificationCode/VerificationCode";
import { Header } from "./Header/Header";
import styles from "./App.module.css";

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId:
      process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
});

function App() {
  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/verification"} element={<VerificationCode />} />
          <Route path={"/mainScreen"} element={<MainScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
