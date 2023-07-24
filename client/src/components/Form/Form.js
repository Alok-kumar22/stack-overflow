import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    tags: "",
    selectedFile: "",
  });

  return (
    <aside className="right-sidebar">
      <div className="auth-container-2">
        <form>
          <label htmlFor="email">
            <input
              type="file"
              name="Title"
              id="Title"
              placeholder="File"
              value={postData.selectedFile}
              className="input"
              onChange={(e) => {
                setPostData({ ...postData, selectedFile: e.target.value });
              }}
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              name="creator"
              id="creator"
              placeholder="Creator"
              value={postData.creator}
              className="input"
              onChange={(e) => {
                setPostData({ ...postData, creator: e.target.value });
              }}
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              name="Title"
              id="Title"
              placeholder="Title"
              value={postData.title}
              className="input"
              onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
              }}
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              name="Title"
              id="Title"
              placeholder="Tags"
              className="input"
              value={postData.tags}
              onChange={(e) => {
                setPostData({ ...postData, tags: e.target.value });
              }}
            />
          </label>
          <label>
            <br />
            <button type="submit" className="auth-btn">
              Upload Post
            </button>
          </label>
        </form>
      </div>
    </aside>
  );
};

export default Form;
