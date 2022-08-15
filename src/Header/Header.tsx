import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useAuth } from "../Authentication/useAuth";
import { UserRole } from "../Models/IUser";
import { routes } from "./routes";
import styles from "./Header.module.css";

interface IProps {
  userRole: UserRole;
}

export const Header = ({ userRole }: IProps) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      toast.success("Successfully logged out");
    } catch (e: any) {
      toast.error("Error while signing out");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" className={styles.appName}>
            SOLARITY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes
              .filter((route) => route.userRoles.includes(userRole))
              .map((route, index) => (
                <Button
                  sx={{ ml: index === 0 ? "auto" : "" }}
                  className={styles.routeLink}
                  key={index}
                  onClick={() => navigate(route.navigationPath)}
                >
                  {route.name}
                </Button>
              ))}

            <Button onClick={logout} className={styles.logoutLink}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
