import { Container } from "@mui/material";
import React from "react";

const Lg = (props) => {
  return <Container maxWidth="lg">{props?.children}</Container>;
};

export default Lg;
