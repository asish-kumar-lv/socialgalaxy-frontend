import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { PostContext } from "../../context/PostContext";
import WritePost from "../AddPost/WritePost";
import * as requestManager from "../../utils/requestManager";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import Lg from "../../components/LayoutContainers/Lg";
import { Box, Grid, Typography } from "@mui/material";
import UserCard from "../../components/UserCard/UserCard";
import AddPost from "../AddPost/AddPost";
import Login from "../login/Login";

const AllPosts = () => {
  const { showAddPost } = useContext(PostContext);
  const { currentUser } = useContext(UserContext);

  const [allPosts, setAllPosts] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await requestManager.apiGetWithToken("/post/allPosts");
      if (response?.data) {
        setAllPosts(response?.data?.data ?? []);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  const getSuggestedFriends = async () => {
    try {
      const response = await requestManager.apiGetWithToken(
        "/user/suggestedFriends"
      );
      if (response?.data) {
        setAllFriends(response?.data?.data ?? []);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  useEffect(() => {
    getAllPosts();

    if (currentUser) getSuggestedFriends();
  }, [currentUser]);

  return (
    <Grid container columnSpacing={2} sx={{ paddingTop: "5rem" }}>
      <Grid item xs={2.5}></Grid>

      <Grid item xs={7}>
        <Lg>
          {showAddPost ? <WritePost reload={getAllPosts} /> : null}
          {allPosts?.length ? (
            allPosts.map((post) => (
              <Post post={post} key={post?._id} reload={getAllPosts} />
            ))
          ) : currentUser ? (
            <>
              <Typography textAlign="center" mt={6}>
                No Posts Yet
              </Typography>
            </>
          ) : (
            <>
              <Typography textAlign="center" mt={2}>
                No Posts Yet
              </Typography>
              <Login />
            </>
          )}
        </Lg>
      </Grid>

      <Grid item xs={2.5} alignItems="end" position="relative">
        <Box
          width="min-content"
          position="fixed"
          overflow="scroll"
          marginBottom="3rem"
          sx={{ height: "calc(100% - 5rem)" }}
        >
          {allFriends?.length ? (
            <>
              <Box mt={3} ml={1}>
                <Typography fontWeight={600} fontSize={"1.2rem"}>
                  Join Community
                </Typography>
              </Box>
              {allFriends.map((user) => (
                <UserCard
                  user={user}
                  key={user?._id}
                  reload={getSuggestedFriends}
                />
              ))}
              {allFriends.map((user) => (
                <UserCard
                  user={user}
                  key={user?._id}
                  reload={getSuggestedFriends}
                />
              ))}
            </>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AllPosts;
