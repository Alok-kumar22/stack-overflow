import * as api from "../api";

export const getvedio = () => async (dispatch) => {
  try {
    const data = await api.getpost();
    dispatch({ type: "FETCH_ALL_VEDIOS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createvedio = (newPost, navigate) => async (dispatch) => {
  try {
    const data = await api.createvedio(newPost);

    dispatch({ type: "CREATED_VEDIO", payload: data });
    navigate("/community/dashboard");
  } catch (error) {
    console.log(error);
  }
};
export const likevedio = (id, userId) => async (dispatch) => {
  try {
    await api.likevedio(id, userId);
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
