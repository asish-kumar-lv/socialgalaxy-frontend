import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorComponent from "../../components/InputField/ErrorComponent";
import { UserContext } from "../../context/UserContext";
import * as requestManager from "../../utils/requestManager";

const Login = (props) => {
  const navigate = useNavigate();
  const { dialog } = props;
  const { checkLogin, setOpenLoginPrompt, openLoginPrompt } =
    useContext(UserContext);
  const url1 =
    "url(https://img.freepik.com/premium-vector/soft-colored-memphis-pattern-design_336924-6089.jpg?w=1380)";

  const url2 =
    "url(https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-63862.jpg?w=1800)";

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
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handleLogin = async (values) => {
    try {
      const response = await requestManager.apiPost("/user/login", values);

      if (response?.status === 200) {
        localStorage.setItem("token", response.data?.token);
        checkLogin();
        if (openLoginPrompt) {
          setOpenLoginPrompt(false);
        }
        navigate("/");
      } else {
        toast(response?.data?.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    handleLogin(values);
    setSubmitting(false);
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
        backgroundImage: url2,
      }}
    >
      <Typography
        fontSize="1.5rem"
        fontWeight={600}
        textAlign="center"
        mb={5}
        color="#282c34"
      >
        Social Star Login
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
                placeholder="abc@def.com"
                label="E-Mail"
                fullWidth
                sx={inputStyle}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors && touched.email && errors.email && (
                <ErrorComponent>{errors.email} </ErrorComponent>
              )}
              <TextField
                placeholder="********"
                label="Password"
                fullWidth
                sx={inputStyle}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
              />
              {errors && touched.password && errors.password && (
                <ErrorComponent>{errors.password} </ErrorComponent>
              )}
              <Box width="100%" mt={2}>
                <Typography color="black" textAlign="left" fontSize="0.8rem">
                  Forgot Password?{" "}
                  <Link to="/reset" reloadDocument={dialog}>
                    Reset
                  </Link>
                </Typography>
              </Box>
              <Box width={"100%"}>
                <Typography fontSize="0.8rem">
                  Not an Account?{" "}
                  <Link to="/register" reloadDocument={dialog}>
                    Register
                  </Link>
                </Typography>
                <Button
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
                  type="submit"
                >
                  Login
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Login;
