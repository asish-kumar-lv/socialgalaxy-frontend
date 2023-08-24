import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Header() {
  const navigate = useNavigate();

  const { currentUser, authLoading } = React.useContext(UserContext);
  const handleProfileClick = () => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  if (authLoading) return;
  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          "url(https://media.tenor.com/3zb7e2Hb9f4AAAAC/galaxy-stars.gif)",
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              cursor: "pointer",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "capitalize",
              fontSize: "1.6rem",
            }}
          >
            {currentUser ? currentUser?.name : "Social Galaxy"}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    currentUser
                      ? "https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      : "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1692808875~exp=1692809475~hmac=25e58aa7a3d6d7ce4b57dd4f525ff67aa54cb1bcff9532b5dd2fcb7b25de63c9"
                  }
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
