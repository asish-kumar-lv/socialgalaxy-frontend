import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const inputStyle = {
    mb: 3,
    "& label.Mui-focused": {
      color: "black",
    },
    " & .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
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
        Reset Password
      </Typography>
      <TextField
        placeholder="abc@def.com"
        label="E-Mail"
        fullWidth
        sx={inputStyle}
      />

      <Box width={"100%"}>
        <Typography fontSize="0.8rem">
          Already have an account? <Link to="/Login">Login</Link>
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
        >
          Send Recovery Email
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
