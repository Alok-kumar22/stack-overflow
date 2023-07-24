import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./community.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, likepost } from "../../actions/posts";
import { BiUserCircle, BiCommentDetail } from "react-icons/bi";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import moment from "moment";
import { getvedio } from "../../actions/vedios";
const Communitydashboard = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer);
  const [showCommentInput, setShowCommentInput] = useState(false); // New state variable
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.currentUserReducer);
  const vedios = useSelector((state) => state.vedioReducer);
  const navigate = useNavigate();
  const handlelike = (event, id) => {
    event.preventDefault();
    if (user === null) {
      alert("Please Sign Up Or login");
      navigate("/");
    }
    dispatch(likepost(id, { userId: user.result._id }));
  };
  console.log(post);

  const handlecomment = (event) => {
    event.preventDefault();
    setShowCommentInput(!showCommentInput); // Toggle the comment input
  };
  const submitcomment = async (event, id) => {
    event.preventDefault();
    const userName = user.result.name;
    try {
      axios.put(`http://localhost:5000/post/${id}/comment`, {
        userName,
        comment,
      });
      handlecomment(event);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getvedio());
  }, [dispatch]);

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <div className="appbar">Community Dashboard</div>&nbsp;
        <div className="col-md-9">
          <div className="post">
            {post?.data?.data?.map((p) => (
              <div className="card" style={{ width: "100% " }} key={p._id}>
                <div className="card-header">
                  <Link to={`/Users/${p.userId}`} className="user-profile-link">
                    <BiUserCircle />
                    &nbsp;
                    {p.creator}
                  </Link>
                </div>
                <img
                  src={`http://localhost:5000/post/photo/${p._id}`}
                  alt={p.tag}
                  height={500}
                  width="100%"
                />
                <div className="card-body">
                  <p className="card-text">
                    <AiFillHeart
                      size={20}
                      className="bg-danger"
                      onClick={(event) => handlelike(event, p._id)}
                    />
                    &nbsp;
                    {p.likeCount.length}
                    &nbsp; &nbsp;&nbsp;
                    <BiCommentDetail
                      onClick={(event) => {
                        handlecomment(event);
                      }}
                    />{" "}
                    {p.comments.length}
                  </p>
                  <div className="commentbox">
                    {" "}
                    {/* Add CSS class to commentbox div */}
                    {showCommentInput &&
                      p.comments.map((i) => (
                        <div>
                          <div>
                            <p>
                              {" "}
                              @{i.userName}&nbsp;&nbsp;&nbsp;{" "}
                              {moment(i.giveOn).fromNow()}&nbsp; &nbsp; &nbsp;
                              &nbsp;
                            </p>
                          </div>
                          <p>{i.comment}</p>
                        </div>
                      ))}
                    {showCommentInput && (
                      <div className="comment-input">
                        <input
                          type="text"
                          value={comment}
                          placeholder="Write a comment"
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        />
                        <button
                          type="button"
                          onClick={(event) => {
                            submitcomment(event, p._id);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="post">
          {vedios?.data?.data?.map((p) => (
            <div className="card" style={{ width: "100% " }} key={p._id}>
              <div className="card-header">
                <Link to={`/Users/${p.userId}`} className="user-profile-link">
                  <BiUserCircle />
                  &nbsp;
                  {p.creator}
                </Link>
              </div>
              <vedio
                src={`http://localhost:5000/post/vedio/${p._id}`}
                controls
                alt={p.tag}
                height={500}
                width="100%"
              />
              <div className="card-body">
                <p className="card-text">
                  <AiFillHeart
                    size={20}
                    className="bg-danger"
                    onClick={(event) => handlelike(event, p._id)}
                  />
                  &nbsp;
                  {p.likeCount.length}
                  &nbsp; &nbsp;&nbsp;
                  <BiCommentDetail
                    onClick={(event) => {
                      handlecomment(event);
                    }}
                  />{" "}
                  {p.comments.length}
                </p>
                <div className="commentbox">
                  {" "}
                  {/* Add CSS class to commentbox div */}
                  {showCommentInput &&
                    p.comments.map((i) => (
                      <div>
                        <div>
                          <p>
                            {" "}
                            @{i.userName}&nbsp;&nbsp;&nbsp;{" "}
                            {moment(i.giveOn).fromNow()}&nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </p>
                        </div>
                        <p>{i.comment}</p>
                      </div>
                    ))}
                  {showCommentInput && (
                    <div className="comment-input">
                      <input
                        type="text"
                        value={comment}
                        placeholder="Write a comment"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                      <button
                        type="button"
                        onClick={(event) => {
                          submitcomment(event, p._id);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communitydashboard;
