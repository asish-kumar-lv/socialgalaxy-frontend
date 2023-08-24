import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Input, Paper } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { Formik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { PostContext } from "../../context/PostContext";
import * as requestManager from "../../utils/requestManager";

const WritePost = (props) => {
  const { setShowAddPost } = useContext(PostContext);
  const springs = useSpring({
    from: { y: -1000 },
    to: { y: 0 },
  });

  const handleAddPost = async (values) => {
    try {
      const response = await requestManager.apiPostWithToken(
        "/post/addPost",
        values
      );
      console.log(response?.data);
      if (props?.reload) props?.reload();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const onSubmitClick = (values, { setSubmitting, resetForm }) => {
    resetForm();
    handleAddPost(values);
    setSubmitting(false);
  };

  return (
    <animated.div
      style={{
        ...springs,
      }}
    >
      <Paper sx={{ p: 2, mt: 3, position: "relative" }}>
        <IconButton
          onClick={() => {
            setShowAddPost(false);
          }}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translate(50%,-50%)",
            background: "#d7d3df",
            ":hover": {
              background: "#d7d3df",
            },
            width: "25px",
            height: "25px",
          }}
        >
          <Close sx={{ color: "black", fontSize: "16px" }} />
        </IconButton>

        <Formik
          initialValues={{
            content: "",
          }}
          onSubmit={onSubmitClick}
        >
          {({
            values,

            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box
                  direction={"row"}
                  display="flex"
                  alignItems={"center"}
                  gap={1}
                >
                  <Input
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
                    rows={4}
                    disableUnderline
                    autoFocus
                    placeholder="Write your thoughts..."
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>

                <Button
                  type="submit"
                  sx={{
                    marginLeft: "auto",
                    display: "block",
                    mt: 2,
                    textTransform: "none",
                  }}
                  disabled={values?.content?.trim() === "" || isSubmitting}
                >
                  <Paper
                    sx={{
                      p: "4px 30px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      background: "#282c34",
                      color: "white",
                    }}
                  >
                    Post
                  </Paper>
                </Button>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </animated.div>
  );
};

export default WritePost;
