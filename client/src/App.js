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
import Subscritpion from "./pages/Subscription/Subscritpion";
import UserProfile from "./pages/UserProfile/UserProfile";
import ComunityDashboard from "./pages/communityPage/Communitydashboard";
import CommunityPost from "./pages/communityPage/CommunityPost";
import { getPosts } from "./actions/posts";
import Friends from "./pages/communityPage/Friends";
import { getvedio } from "./actions/vedios";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestion());
    dispatch(fetchAllUsers());
    dispatch(getPosts());
    dispatch(getvedio());
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
        <Route path="/Subscription/:id" element={<Subscritpion />} />
        <Route path="/community/dashboard" element={<ComunityDashboard />} />
        <Route path="/create-post" element={<CommunityPost />} />
        <Route path="/friendlist" element={<Friends />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Users/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
