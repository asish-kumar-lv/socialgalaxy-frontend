import { Container } from "@mui/material";
import React from "react";

const Lg = (props) => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "5rem", paddingBottom: "2rem" }}>
      {props?.children}
    </Container>
  );
};

export default Lg;
