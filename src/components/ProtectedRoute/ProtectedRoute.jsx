import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
