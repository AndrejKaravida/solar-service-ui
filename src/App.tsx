import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainScreen } from "./MainScreen/MainScreen";
import { VerificationCode } from "./VerificationCode/VerificationCode";
import { MyInvestments } from "./MyInvestments/MyInvestments";
import styles from "./App.module.css";
import { Header } from "./Header/Header";
import { WorldMap } from "./WorldMap/WorldMap";
import { HowItWorks } from "./HowItWorks/HowItWorks";

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
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/verification"} element={<VerificationCode />} />
          <Route
            path={"/mainScreen"}
            element={
              <>
                <Header /> <MainScreen />{" "}
              </>
            }
          />
          <Route
            path={"/myInvestments"}
            element={
              <>
                <Header /> <MyInvestments />
              </>
            }
          />{" "}
          <Route
            path={"/worldMap"}
            element={
              <>
                <Header /> <WorldMap />
              </>
            }
          />
          <Route
            path={"/howItWorks"}
            element={
              <>
                <Header /> <HowItWorks />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
