import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as requestManager from "../../utils/requestManager";
import * as Yup from "yup";
import ErrorComponent from "../../components/InputField/ErrorComponent";
import { toast } from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
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

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    occupation: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    password_confirm: Yup.string().required(),
  });

  const handleRegister = async (values) => {
    try {
      const response = await requestManager.apiPost("/user/register", values);
      console.log(response.data);
      if (response.status === 200) {
        toast.success("registered successfully");
        navigate("/login");
      } else {
        toast(response?.data?.message);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      handleRegister(values);
      setSubmitting(false);
    }, 400);
  };
  const url1 =
    "url(https://img.freepik.com/premium-vector/soft-colored-memphis-pattern-design_336924-6089.jpg?w=1380)";

  const url2 =
    "url(https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-63862.jpg?w=1800)";
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        p: "5rem 3rem",
        background: "white",
        color: "black",
        borderRadius: "4px",
        backgroundImage: url1,
      }}
    >
      <Typography
        fontSize="1.5rem"
        fontWeight={600}
        textAlign="center"
        mb={5}
        color="#282c34"
      >
        Social Star Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                placeholder="Enter Name"
                label="Name"
                name="name"
                value={values.name}
                fullWidth
                sx={inputStyle}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.name && errors.name && (
                <ErrorComponent>{errors.name}</ErrorComponent>
              )}
              <TextField
                placeholder="abc@def.com"
                label="E-Mail"
                fullWidth
                sx={inputStyle}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.email && errors.email && (
                <ErrorComponent> {errors.email}</ErrorComponent>
              )}

              <TextField
                placeholder="********"
                label="Password"
                fullWidth
                sx={inputStyle}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
              {errors && touched.password && errors.password && (
                <ErrorComponent>{errors.password}</ErrorComponent>
              )}

              <TextField
                placeholder="********"
                label="Confirm Password"
                fullWidth
                sx={inputStyle}
                name="password_confirm"
                value={values.password_confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
              {errors &&
                touched.password_confirm &&
                errors.password_confirm && (
                  <ErrorComponent>{errors.password_confirm}</ErrorComponent>
                )}

              <TextField
                placeholder="Enter Occupation"
                label="Occupation"
                fullWidth
                sx={inputStyle}
                name="occupation"
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && touched.occupation && errors.occupation && (
                <ErrorComponent>{errors.occupation}</ErrorComponent>
              )}

              <Box width={"100%"}>
                <Typography fontSize="0.8rem">
                  Already have an account? <Link to="/Login">Login</Link>
                </Typography>
                <Button
                  type="submit"
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
                  }}
                  variant="outlined"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering" : "Register"}
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Register;
