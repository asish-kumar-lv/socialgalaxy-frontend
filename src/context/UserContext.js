import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as requestManager from "../utils/requestManager";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const logoutCurrentUser = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };
  const checkLogin = async () => {
    try {
      setAuthLoading(true);
      const response = await requestManager.apiGetWithToken("/user/me");

      if (response.status === 200) {
        setCurrentUser(response?.data?.user);
        setAuthLoading(false);
      } else {
        // navigate("/");
        setAuthLoading(false);
      }
    } catch (e) {
      //   navigate("/");
      setAuthLoading(false);
    } finally {
      setAuthLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 400);
  }, []);
  const stateValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      checkLogin,
      logoutCurrentUser,
      authLoading,
      openLoginPrompt,
      setOpenLoginPrompt,
    }),
    [currentUser, authLoading, openLoginPrompt]
  );

  return (
    <UserContext.Provider value={stateValues}>{children}</UserContext.Provider>
  );
};
