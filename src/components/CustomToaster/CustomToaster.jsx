import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        success: {
          style: {
            background: "green",
            fontSize: "0.9rem",
            padding: "10px",
            color: "white",
          },
        },
        error: {
          style: {
            background: "red",
            fontSize: "0.9rem",
            padding: "10px",
            color: "white",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
