import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Comment = (props) => {
  const { content, user, createdAt } = props?.comment;
  const date = new Date(createdAt);

  return (
    <Stack
      direction={"row"}
      gap={1}
      ml={2}
      mt={2}
      pl={1}
      sx={{ borderLeft: "1px solid #d7d3df" }}
    >
      <Avatar
        sx={{ width: 24, height: 24 }}
        alt="Remy Sharp"
        src={
          user?.profileImage
            ? process.env.REACT_APP_BASE_FILE_PATH + user?.profileImage
            : "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1692808875~exp=1692809475~hmac=25e58aa7a3d6d7ce4b57dd4f525ff67aa54cb1bcff9532b5dd2fcb7b25de63c9"
        }
      />
      <Box>
        <Typography fontWeight="bold" fontSize="0.95rem">
          {user?.name}
        </Typography>
        <Typography fontSize="0.9rem">{content}</Typography>
        <Typography fontSize="0.7rem" color="grey">
          {date.toLocaleDateString("en", {
            year: "numeric",
            day: "2-digit",
            month: "long",
          })}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Comment;
