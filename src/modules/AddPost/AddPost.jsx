import { Telegram } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";

const AddPost = () => {
  const { pathname } = useLocation();
  const { setShowAddPost } = useContext(PostContext);
  const { currentUser, setOpenLoginPrompt } = useContext(UserContext);
  if (pathname !== "/") return;

  const handleAddPostClick = () => {
    if (currentUser) {
      setShowAddPost(true);
    } else {
      setOpenLoginPrompt(true);
    }
  };

  return (
    <Box position="fixed" bottom="8%" right="10%">
      <Tooltip title="Add Post">
        <IconButton
          onClick={handleAddPostClick}
          sx={{ background: "white", ":hover": { background: "white" } }}
        >
          <Telegram
            fontSize="large"
            sx={{ color: "#282c34", ":hover": { color: "black" } }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default AddPost;
