import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

import "./Post.css";

const Friends = () => {
  const user = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.userReducer);

  const currentProfile = users.filter(
    (useri) => useri._id === user?.result?._id
  )[0];
  console.log(currentProfile);

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-mainbar-3">
        <div className="appbar">Your Following List</div>
        <div className="friendbox">
          {currentProfile?.following?.map((p) => (
            <div className="card" style={{ width: "100% " }} key={p._id}>
              <BiUserCircle /> {p.followingName}
            </div>
          ))}
        </div>
        <div className="appbar">Your Follower List</div>
        <div className="friendbox">
          {currentProfile?.followers?.map((p) => (
            <div className="card" style={{ width: "100% " }} key={p._id}>
              <BiUserCircle /> {p.friendName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
