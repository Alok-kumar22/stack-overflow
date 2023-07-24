import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const data = await api.getpost();
    dispatch({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getuserPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.getuserpost(id);
    dispatch({ type: "FETCH_USER_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost, navigate) => async (dispatch) => {
  try {
    const data = await api.createpost(newPost);

    dispatch({ type: "CREATED_POST", payload: data });
    navigate("/community/dashboard");
  } catch (error) {
    console.log(error);
  }
};
export const likepost = (id, userId) => async (dispatch) => {
  try {
    await api.likepost(id, userId);
  } catch (error) {
    console.log(error);
  }
};
export const addfriend = (id, value) => async (dispatch) => {
  try {
    const data = await api.addfriends(id, value);
    dispatch({ type: "GET_FRIENDS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const removefriend = (id, value) => async (dispatch) => {
  try {
    await api.deletefriends(id, value);
  } catch (error) {
    console.log(error);
  }
};

/*export const commentpost = (value, navigate) => async (dispatch) => {
  try {
    const { id, comment, userName } = value;
    await api.comments(id, comment, userName);
    navigate("/community/dashboard");
  } catch (error) {
    console.log(error);
  }
};*/
