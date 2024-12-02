import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as requestManager from "../../utils/requestManager";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import ErrorComponent from "../../components/InputField/ErrorComponent";

const ChangePassword = () => {
  const { logoutCurrentUser } = useContext(UserContext);

  const inputStyle = {
    mt: 3,
    "& label.Mui-focused": {
      color: "black",
    },
    " & .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  };
  const navigate = useNavigate();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required(),
    confirmNewPassword: Yup.string()
      .required()
      .test((value, context) => {
        if (value !== context.parent.newPassword)
          return context.createError({ message: "Passwords do not match" });
        else return true;
      }),
  });

  const handleChangePassword = async (values) => {
    try {
      const response = await requestManager.apiPostWithToken(
        "/user/changePassword",
        values
      );
      if (response.status === 200) {
        toast.success("Password changed successfully");
        // logoutCurrentUser();
        navigate("/login");
      } else {
        toast(response?.data?.message);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        p: "5rem 3rem",
        background: "white",
        color: "black",
        borderRadius: "4px",
        backgroundImage:
          "url(https://img.freepik.com/premium-vector/soft-colored-memphis-pattern-design_336924-6089.jpg?w=1380)",
      }}
    >
      <Typography
        fontSize="1.5rem"
        fontWeight={600}
        textAlign="center"
        mb={5}
        color="#282c34"
      >
        Change Password
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <>
              <TextField
                placeholder="*********"
                label="Enter Old Password"
                fullWidth
                sx={inputStyle}
                type="password"
                name="oldPassword"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.oldPassword && errors.oldPassword && (
                <ErrorComponent>{errors.oldPassword}</ErrorComponent>
              )}
              <TextField
                placeholder="*********"
                label="Enter New Password"
                fullWidth
                sx={inputStyle}
                type="password"
                name="newPassword"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.newPassword && errors.newPassword && (
                <ErrorComponent>{errors.newPassword}</ErrorComponent>
              )}

              <TextField
                placeholder="*********"
                label="Confirm New Password"
                fullWidth
                sx={inputStyle}
                type="password"
                name="confirmNewPassword"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors &&
                touched.confirmNewPassword &&
                errors.confirmNewPassword && (
                  <ErrorComponent>{errors.confirmNewPassword}</ErrorComponent>
                )}

              <Box width={"100%"}>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disableRipple
                  sx={{
                    marginLeft: "auto",
                    display: "block",
                    color: "#282c34",
                    borderColor: "#282c34",
                    ":hover": {
                      color: "#282c34",
                      borderColor: "#282c34",
                    },
                    mt: 3,
                  }}
                  variant="outlined"
                >
                  Change Password
                </Button>
              </Box>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

export default ChangePassword;
