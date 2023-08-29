import { Box, Dialog } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Login from "../../modules/login/Login";

const AskLoginPrompt = () => {
  const { openLoginPrompt, setOpenLoginPrompt } = useContext(UserContext);
  return (
    <Dialog
      open={openLoginPrompt}
      onClose={() => setOpenLoginPrompt(false)}
      sx={{ minWidth: 600 }}
    >
      <Box
        minWidth="30vw"
        sx={{
          background:
            "url(https://img.freepik.com/free-vector/galaxy-iphone-wallpaper-mobile-background-cute-space-vector_53876-136883.jpg?w=740&t=st=1692871939~exp=1692872539~hmac=32bfedbaf0fd72ee5f96020139685dd062af39de14fb5dc913da2c50b9093246)",
        }}
      >
        <Login dialog />
      </Box>
    </Dialog>
  );
};

export default AskLoginPrompt;
