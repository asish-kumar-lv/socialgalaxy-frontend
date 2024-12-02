import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as requestManager from "../../utils/requestManager";
import * as Yup from "yup";
import ErrorComponent from "../../components/InputField/ErrorComponent";
import Md from "../../components/LayoutContainers/Md";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { DriveFileRenameOutline } from "@mui/icons-material";

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser, checkLogin } = useContext(UserContext);
  const url1 =
    "url(https://img.freepik.com/premium-vector/soft-colored-memphis-pattern-design_336924-6089.jpg?w=1380)";

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

  const [initialValues, setInitialValues] = React.useState({
    name: currentUser?.name,
    occupation: currentUser?.occupation,
    profileImage: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(),
  });

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", values.name);

      formData.append("occupation", values.occupation);
      formData.append("file", values.profileImage);
      const response = await requestManager.apiPutWithTokenFormData(
        "/user/editProfile",
        formData
      );

      if (response.status === 200) {
        setIsSubmitting(false);
        toast.success("Profile Edited Successfully");
        checkLogin();
        navigate("/");
      }
    } catch (e) {
      setIsSubmitting(false);
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  return (
    <Md>
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            console.log(values);
            return (
              <form onSubmit={handleSubmit}>
                <Typography
                  fontSize="1.5rem"
                  fontWeight={600}
                  textAlign="center"
                  mb={2}
                  color="#282c34"
                >
                  Edit Profile
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                    width: "max-content",
                    margin: "auto",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      zIndex: 100,
                      mb: 3,
                    }}
                    alt="Remy Sharp"
                    src={
                      values?.profileImage
                        ? URL.createObjectURL(values?.profileImage)
                        : currentUser?.profileImage
                        ? process.env.REACT_APP_BASE_FILE_PATH +
                          currentUser?.profileImage
                        : "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1692808875~exp=1692809475~hmac=25e58aa7a3d6d7ce4b57dd4f525ff67aa54cb1bcff9532b5dd2fcb7b25de63c9"
                    }
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      bottom: -10,
                      zIndex: 150,
                      background: "white",
                    }}
                    htmlFor="profileImage"
                    component="label"
                  >
                    <DriveFileRenameOutline />
                  </IconButton>

                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFieldValue("profileImage", e.target.files[0])
                    }
                  />
                </Box>
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
                <Button
                  type="submit"
                  disableRipple
                  sx={{
                    marginLeft: "auto",
                    mt: 2,
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
                  {isSubmitting ? "Editing Profile" : "Edit Profile"}
                </Button>
              </form>
            );
          }}
        </Formik>
      </Container>
    </Md>
  );
};

export default EditProfile;
