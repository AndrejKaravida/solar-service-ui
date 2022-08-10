import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useAuth } from "../Authentication/useAuth";

export const Header = () => {
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
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/mainScreen"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SOLARITY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block", ml: "auto" }}
              onClick={() => navigate("/mainScreen")}
            >
              Main Screen
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/myInvestments")}
            >
              My Investments
            </Button>{" "}
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/worldMap")}
            >
              World Map
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/howItWorks")}
            >
              How It Works
            </Button>
            <Button
              onClick={logout}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                marginLeft: "auto",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
