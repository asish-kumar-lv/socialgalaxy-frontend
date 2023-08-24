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
        src="https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
