import {
  CheckCircle,
  JoinFull,
  PersonAdd,
  PersonRemove,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import * as requestManager from "../../utils/requestManager";

const UserCard = (props) => {
  const { user, profile, request } = props;

  const handleRequest = async () => {
    try {
      const response = await requestManager.apiPutWithToken(
        user?.isRequestSent
          ? `/user/requestFriendRollback/${user?._id}`
          : `/user/requestFriend/${user?._id}`
      );

      if (props?.reload) props?.reload();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const acceptRequest = async () => {
    try {
      const response = await requestManager.apiPutWithToken(
        `/user/acceptRequest/${user?._id}`
      );

      if (props?.reload) props?.reload();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <Paper
      sx={{
        padding: 2,
        position: "relative",
        // paddingBottom: 7,
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <Stack direction={"row"} gap={2}>
        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src={
              user?.profileImage
                ? process.env.REACT_APP_BASE_FILE_PATH + user?.profileImage
                : "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1692808875~exp=1692809475~hmac=25e58aa7a3d6d7ce4b57dd4f525ff67aa54cb1bcff9532b5dd2fcb7b25de63c9"
            }
          />
        </IconButton>
        <Box>
          <Typography fontWeight="bold" fontSize={"1.1rem"}>
            {user?.name}
          </Typography>
          <Typography fontSize="0.8rem" color="grey">
            {user?.occupation}
          </Typography>
        </Box>
        {profile ? (
          request ? (
            <IconButton sx={{ marginLeft: "auto" }} onClick={acceptRequest}>
              <CheckCircle sx={{ color: "red" }} />
            </IconButton>
          ) : null
        ) : user?.isRequestReceived ? (
          <IconButton sx={{ marginLeft: "auto" }} onClick={acceptRequest}>
            <CheckCircle sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            sx={{ marginLeft: "auto" }}
            disableRipple
            onClick={handleRequest}
          >
            {user?.isRequestSent ? (
              <PersonRemove sx={{ color: "grey" }} />
            ) : (
              <PersonAdd sx={{ color: "black" }} />
            )}
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
};

export default UserCard;
