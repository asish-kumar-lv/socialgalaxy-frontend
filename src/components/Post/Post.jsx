import React, { useContext } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Comment from "../Comment/Comment";
import { useState } from "react";
import AddComment from "../Comment/AddComment";
import { UserContext } from "../../context/UserContext";
import * as requestManager from "../../utils/requestManager";
import { toast } from "react-hot-toast";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const { currentUser, setOpenLoginPrompt } = useContext(UserContext);
  const [like, setLike] = useState(post?.like);

  const reactPost = async (values) => {
    try {
      const response = await requestManager.apiPutWithToken("/post/postReact", {
        id: post?._id,
      });

      console.log(response?.data);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getComments = async () => {
    try {
      const response = await requestManager.apiGetWithToken(
        `/post/getComments/${post?._id}`
      );

      console.log(response?.data);
      setCommentsData(response?.data?.data);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleLike = () => {
    if (currentUser) {
      reactPost();
      setLike(true);
    } else {
      setOpenLoginPrompt(true);
    }
  };
  const handleDisLike = () => {
    if (currentUser) {
      reactPost();
      setLike(false);
    } else {
      setOpenLoginPrompt(true);
    }
  };
  const handleCommentClick = () => {
    if (currentUser) {
      getComments();
      setShowComments(!showComments);
    } else {
      setOpenLoginPrompt(true);
    }
  };
  const date = new Date(post?.createdAt);
  return (
    <Paper
      sx={{
        padding: 2.5,
        position: "relative",
        paddingBottom: 7,
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <Stack direction={"row"} gap={2}>
        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </IconButton>
        <Box>
          <Typography fontWeight="bold" fontSize={"1.1rem"}>
            {post?.user?.name}
          </Typography>
          <Typography fontSize="0.8rem" color="grey">
            {date.toLocaleDateString("en", {
              year: "numeric",
              day: "2-digit",
              month: "long",
            })}
          </Typography>
        </Box>
      </Stack>
      <Box mt={2} ml={1}>
        <Typography
          lineHeight={"1.3rem"}
          fontSize="1.1rem"
          fontWeight={500}
          letterSpacing={0.9}
          flexWrap="wrap"
        >
          {post?.content}
        </Typography>
      </Box>
      {showComments ? (
        <>
          {commentsData?.length
            ? commentsData?.map((comment) => <Comment comment={comment} />)
            : null}
          <AddComment
            showComments={showComments}
            reload={getComments}
            post={post}
          />
        </>
      ) : null}

      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          background: "linear-gradient(0deg, rgba(40,44,52,1) 0%, white 75%)",
          width: "100%",
          height: "2.5rem",
        }}
      >
        <Stack direction="row" alignItems={"center"} gap={2}>
          {like ? (
            <Favorite
              sx={{ ml: 3, cursor: "pointer" }}
              color="secondary"
              onClick={handleDisLike}
            />
          ) : (
            <FavoriteBorder
              sx={{ ml: 3, cursor: "pointer" }}
              onClick={handleLike}
            />
          )}
          <Stack
            direction={"row"}
            onClick={handleCommentClick}
            sx={{ cursor: "pointer" }}
          >
            <ChatBubbleOutline />
            {/* <Typography ml={0.5} fontSize="0.9rem">
              3 comments
            </Typography> */}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Post;
