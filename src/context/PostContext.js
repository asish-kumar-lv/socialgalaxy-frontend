import { createContext, useMemo, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [showAddPost, setShowAddPost] = useState(false);

  const stateValues = useMemo(
    () => ({
      showAddPost,
      setShowAddPost,
    }),
    [showAddPost]
  );

  return (
    <PostContext.Provider value={stateValues}>{children}</PostContext.Provider>
  );
};
