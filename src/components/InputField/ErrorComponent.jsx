import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorComponent = (props) => {
  return (
    <Typography fontSize={"0.8rem"} color="red">
      {props?.children}
    </Typography>
  );
};

export default ErrorComponent;
