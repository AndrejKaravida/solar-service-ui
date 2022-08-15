import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainScreen } from "./MainScreen/MainScreen";
import { VerificationCode } from "./VerificationCode/VerificationCode";
import { MyInvestments } from "./MyInvestments/MyInvestments";
import styles from "./App.module.css";
import { WorldMap } from "./WorldMap/WorldMap";
import { HowItWorks } from "./HowItWorks/HowItWorks";
import { AuthProvider } from "./Authentication/AuthProvider";
import { RequireAuth } from "./Authentication/RequireAuth";
import { WithoutAuth } from "./Authentication/WithoutAuth";
import { UserRole } from "./Models/IUser";
import { AdminInvestments } from "./AdminInvestments/AdminInvestments";
import { AddNewSolarPanel } from "./AdminPage/AddNewSolarPanel";

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
              path={"/"}
              element={
                <WithoutAuth>
                  <Login />
                </WithoutAuth>
              }
            />
            <Route
              path={"/login"}
              element={
                <WithoutAuth>
                  <Login />
                </WithoutAuth>
              }
            />
            <Route
              path={"/register"}
              element={
                <WithoutAuth>
                  <Register />
                </WithoutAuth>
              }
            />
            <Route
              path={"/verification"}
              element={
                <WithoutAuth>
                  <VerificationCode />
                </WithoutAuth>
              }
            />
            <Route
              path={"/mainScreen"}
              element={
                <RequireAuth userRoles={[UserRole.USER]}>
                  <MainScreen />
                </RequireAuth>
              }
            />
            <Route
              path={"/myInvestments"}
              element={
                <RequireAuth userRoles={[UserRole.USER]}>
                  <MyInvestments />
                </RequireAuth>
              }
            />{" "}
            <Route
              path={"/investments"}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN]}>
                  <AdminInvestments />
                </RequireAuth>
              }
            />{" "}
            <Route
              path={"/addNewPanel"}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN]}>
                  <AddNewSolarPanel />
                </RequireAuth>
              }
            />{" "}
            <Route
              path={"/worldMap"}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN, UserRole.USER]}>
                  <WorldMap />
                </RequireAuth>
              }
            />
            <Route
              path={"/howItWorks"}
              element={
                <RequireAuth userRoles={[UserRole.ADMIN, UserRole.USER]}>
                  <HowItWorks />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
