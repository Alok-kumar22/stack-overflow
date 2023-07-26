import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/posts";
import { createvedio } from "../../actions/vedios";
const CommunityPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [vedio, setVedio] = useState("");
  const [photo, setPhoto] = useState("");
  const [posttype, setPost] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);
  const handlePost = () => {
    if (user == null) {
      alert("please signup or login");
      navigate("/");
    }
    if (posttype) {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("tags", tags);
      productData.append("photo", photo);
      productData.append("userId", user?.result?._id);
      productData.append("creator", user?.result?.name);
      dispatch(createPost(productData, navigate));
    } else {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("tags", tags);
      productData.append("vedio", vedio);
      productData.append("userId", user?.result?._id);
      productData.append("creator", user?.result?.name);
      dispatch(createvedio(productData, navigate));
    }
  };
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-mainbar-3">
        <div className="appbar">Add Post</div>&nbsp;
        <div>
          <button
            onClick={() => {
              setPost(true);
            }}
          >
            Add Photo
          </button>{" "}
          &nbsp;
        </div>
        <section className="auth-section">
          {posttype ? (
            <div className="auth-container-2">
              <label htmlFor="upload images" className="photos">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
          ) : (
            <div className="auth-container-2">
              <label htmlFor="upload images" className="photos">
                {vedio ? vedio.name : "Upload Vedio"}
                <input
                  type="file"
                  name="vedio"
                  accept="vedio/*"
                  onChange={(e) => setVedio(e.target.files[0])}
                />
              </label>
            </div>
          )}

          <div className="photo">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt=" product_photo "
                  height={"300px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="title">
            <input
              className="titleinp"
              type="text"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="tags">
            <input
              className="titleinp"
              type="text"
              value={tags}
              placeholder="Tags"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button onClick={handlePost}>Submit</button>
        </section>
      </div>
    </div>
  );
};

export default CommunityPost;
