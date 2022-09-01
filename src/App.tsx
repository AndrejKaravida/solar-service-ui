import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { VerificationCode } from "./VerificationCode/VerificationCode";
import { MyInvestments } from "./MyInvestments/MyInvestments";
import styles from "./App.module.css";
import { Map } from "./Map/Map";
import { HowItWorks } from "./HowItWorks/HowItWorks";
import { AuthProvider } from "./Authentication/AuthProvider";
import { RequireAuth } from "./Authentication/RequireAuth";
import { WithoutAuth } from "./Authentication/WithoutAuth";
import { UserRole } from "./Models/IUser";
import { AdminInvestments } from "./AdminInvestments/AdminInvestments";
import { AddNewSolarPanel } from "./AdminPage/AddNewSolarPanel";
import { InvestmentCalculation } from "./InvestmentCalculation/InvestmentCalculation";
import { HeaderAdder } from "./Authentication/HeaderAdder";
import {
  allInvestmentsRoute,
  baseRoute,
  homeRoute,
  howItWorksRoute,
  investmentCalculationRoute,
  loginRoute,
  mapRoute,
  myInvestmentsRoute,
  newSolarPanelRoute,
  registerRoute,
  verificationRoute,
} from "../routes";

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path={baseRoute}
              element={
                <WithoutAuth>
                  <Login />
                </WithoutAuth>
              }
            />
            <Route
              path={loginRoute}
              element={
                <WithoutAuth>
                  <Login />
                </WithoutAuth>
              }
            />
            <Route
              path={registerRoute}
              element={
                <WithoutAuth>
                  <Register />
                </WithoutAuth>
              }
            />
            <Route
              path={verificationRoute}
              element={
                <WithoutAuth>
                  <VerificationCode />
                </WithoutAuth>
              }
            />
            <Route
              path={homeRoute}
              element={
                <HeaderAdder>
                  <Home />
                </HeaderAdder>
              }
            />
            <Route
              path={myInvestmentsRoute}
              element={
                <RequireAuth userRoles={[UserRole.USER]}>
                  <MyInvestments />
                </RequireAuth>
              }
            />{" "}
            <Route
              path={investmentCalculationRoute}
              element={
                <HeaderAdder>
                  <InvestmentCalculation />
                </HeaderAdder>
              }
            />{" "}
            <Route
              path={allInvestmentsRoute}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN]}>
                  <AdminInvestments />
                </RequireAuth>
              }
            />{" "}
            <Route
              path={newSolarPanelRoute}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN]}>
                  <AddNewSolarPanel />
                </RequireAuth>
              }
            />{" "}
            <Route
              path={mapRoute}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN, UserRole.USER]}>
                  <Map />
                </RequireAuth>
              }
            />
            <Route
              path={howItWorksRoute}
              element={
                <HeaderAdder>
                  <HowItWorks />
                </HeaderAdder>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
