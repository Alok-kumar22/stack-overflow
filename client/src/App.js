import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Home/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/Questions/DisplayQuestion";
import { useEffect } from "react";
import { fetchAllQuestion } from "./actions/question";
import { useDispatch } from "react-redux";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import { fetchAllUsers } from "./actions/user";
import UserProfile from "./pages/UserProfile/UserProfile";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestion());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/AskQuestion" element={<AskQuestion />} />
        <Route path="/Questions/:id" element={<DisplayQuestion />} />

        <Route path="/Tags" element={<Tags />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Users/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
