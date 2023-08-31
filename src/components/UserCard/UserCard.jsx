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
  const { user, profile } = props;

  const handleRequest = async () => {
    try {
      const response = await requestManager.apiPutWithToken(
        user?.isRequested
          ? `/user/requestFriendRollback/${user?._id}`
          : `/user/requestFriend/${user?._id}`
      );

      console.log(response?.data);
      console.log(response?.data);
      if (props?.reload) props?.reload();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const acceptRequest = async () => {
    try {
      const response = await requestManager.apiPutWithToken(
        `/user/acceptRequest/${user?.friendId}`
      );

      console.log(response?.data);
      console.log(response?.data);
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
            src="https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
          <IconButton
            sx={{ marginLeft: "auto", height: "min-height" }}
            onClick={acceptRequest}
          >
            {!user?.isRequested && user?.isConfirmed ? null : (
              <CheckCircle sx={{ color: "red", height: "min-height" }} />
            )}
          </IconButton>
        ) : (
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleRequest}>
            {user?.isRequested ? (
              <PersonRemove sx={{ color: "black" }} />
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
