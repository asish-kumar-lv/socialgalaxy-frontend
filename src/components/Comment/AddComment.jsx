import { Send } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as requestManager from "../../utils/requestManager";

const AddComment = (props) => {
  const [val, setVal] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await requestManager.apiPostWithToken(
        "/post/postComment",
        {
          id: props?.post?._id,
          content: val,
        }
      );

      if (response.status === 200) {
        setVal("");
        props?.reload();
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  if (myRef.current) myRef.current.focus();
  useEffect(() => {
    if (props?.showComments) {
      executeScroll();
    }
  }, [props.showComments]);
  return (
    <Box
      direction={"row"}
      display="flex"
      alignItems={"center"}
      gap={1}
      ml={2}
      mt={2}
      pl={1}
    >
      <Input
        ref={myRef}
        multiline
        sx={{
          border: "1px solid #d7d3df",
          fontSize: "14px",
          letterSpacing: "2px",
          borderRadius: "0.5rem",
          padding: "0.4rem 0.7rem",
          "& input::placeholder": {
            fontSize: "12px",
          },
        }}
        fullWidth
        disableUnderline
        autoFocus
        placeholder="Add comment..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <IconButton disabled={val?.trim() === ""} onClick={handleSubmit}>
        <Send />
      </IconButton>
    </Box>
  );
};

export default AddComment;
