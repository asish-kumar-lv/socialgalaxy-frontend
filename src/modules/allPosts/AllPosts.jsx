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
  console.log(allFriends);

  return (
    <Lg>
      <Grid container columnSpacing={2}>
        <Grid item xs={2.5}></Grid>
        <Grid item xs={7} sx={{ height: "100vh", overflow: "scroll" }}>
          {showAddPost ? <WritePost reload={getAllPosts} /> : null}
          {allPosts?.length
            ? allPosts.map((post) => <Post post={post} key={post?._id} />)
            : null}
        </Grid>
        <Grid item xs={2.5} alignItems="end">
          <Box width="min-content" marginLeft="auto">
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
              </>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Lg>
  );
};

export default AllPosts;
