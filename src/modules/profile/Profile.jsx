import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Post from "../../components/Post/Post";
import { UserContext } from "../../context/UserContext";
import * as requestManager from "../../utils/requestManager";

const Profile = () => {
  const { logoutCurrentUser, currentUser } = useContext(UserContext);

  const [allPosts, setAllPosts] = useState([]);
  const getAllPosts = async (values) => {
    try {
      const response = await requestManager.apiGetWithToken(
        "/post/getUserPosts",
        values
      );
      if (response?.data) setAllPosts(response?.data?.data ?? []);
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await requestManager.apiDeleteWithToken(
        `/post/deletePost/${id}`
      );
      if (response?.data) {
        toast.success("post deleted successfully");

        getAllPosts();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleLogout = () => {
    logoutCurrentUser();
  };

  return (
    <Box>
      <Box sx={{ borderRadius: "4px" }}>
        <Box
          height={200}
          style={{
            width: "100%",
            borderRadius: "4px 4px 0 0",
            position: "relative",
          }}
        >
          <img
            src="https://picsum.photos/852/200?grayscale"
            style={{ objectFit: "contain", borderRadius: "4px 4px 0 0" }}
            alt="background"
          />
          <Avatar
            sx={{
              position: "absolute",
              left: "5%",
              bottom: "-18%",
              width: 80,
              height: 80,
              zIndex: 100,
            }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </Box>
        <Box
          sx={{
            background: "white",
            height: 150,
            width: "100%",
            borderRadius: "0 0 4px 4px",
            position: "relative",
          }}
        >
          <Typography
            fontSize={18}
            color="black"
            fontWeight={600}
            pt={5}
            pl={5}
            textTransform="capitalize"
            fontFamily="monospace"
            // fontWeight: 700,
            letterSpacing=".3rem"
          >
            {currentUser?.name}
          </Typography>

          <Typography
            fontSize={12}
            color="grey"
            pl={5}
            textTransform="capitalize"
          >
            {currentUser?.occupation}
          </Typography>
          <Typography fontSize={12} color="grey" fontStyle="italic" pl={5}>
            {currentUser?.email}
          </Typography>
          <Button
            sx={{ position: "absolute", right: "1rem", textTransform: "none" }}
            onClick={handleLogout}
          >
            <Paper sx={{ p: "2px 10px" }}>Logout</Paper>
          </Button>
        </Box>
      </Box>
      {allPosts?.length
        ? allPosts.map((post) => (
            <Post post={post} allowDelete deletePost={deletePost} />
          ))
        : null}
    </Box>
  );
};

export default Profile;
