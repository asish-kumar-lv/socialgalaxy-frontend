import { Container } from "@mui/material";
import React from "react";

const Md = (props) => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: "5rem", paddingBottom: "2rem" }}>
      {props?.children}
    </Container>
  );
};

export default Md;
