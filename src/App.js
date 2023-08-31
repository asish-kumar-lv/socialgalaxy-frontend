import "./App.css";
import Header from "./components/header/Header";
import { Container } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import CustomToaster from "./components/CustomToaster/CustomToaster";
import AppRoutes from "./Routes";
import { UserContextProvider } from "./context/UserContext";
import AddPost from "./modules/AddPost/AddPost";
import { PostContextProvider } from "./context/PostContext";
import AskLoginPrompt from "./components/AskLoginPrompt/AskLoginPrompt";

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <UserContextProvider>
          <PostContextProvider>
            <Header />

            <AppRoutes />
            <AddPost />
            <AskLoginPrompt />
          </PostContextProvider>
        </UserContextProvider>
      </BrowserRouter>
      <CustomToaster />
    </div>
  );
}

export default App;
