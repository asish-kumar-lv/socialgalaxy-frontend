import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserContext } from "./context/UserContext";
import AllPosts from "./modules/allPosts/AllPosts";
import Login from "./modules/login/Login";
import Profile from "./modules/profile/Profile";
import Register from "./modules/register/Register";
import ResetPassword from "./modules/resetPassword/ResetPassword";
import EditProfile from "./modules/profile/EditProfile";
import ChangePassword from "./modules/changePassword/ChangePassword";

const AppRoutes = () => {
  const { authLoading } = useContext(UserContext);
  if (authLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
