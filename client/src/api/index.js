import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signUp = (authData) => API.post("/user/signup", authData);
export const logIn = (authData) => API.post("/user/login", authData);
export const postQuestion = (questionData) => {
  API.post("/questions/Ask", questionData);
};

export const getAllQuestions = () => API.get("/questions/get");

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });

export const deleteQuestion = (id) => {
  API.delete(`/questions/delete/${id}`);
};

export const deleteAnswer = (id, answerId, noOfAnswers) => {
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });
};

export const voteQuestion = (id, value, userId) => {
  API.patch(`/questions/vote/${id}`, { value, userId });
};

export const likepost = (id, userId) => {
  API.put(`/post/likepost/${id}`, userId);
};
export const likevedio = (id, userId) => {
  API.put(`/post/likevedio/${id}`, userId);
};
export const fetchAllUsers = () => API.get("/user/getAllUsers");

export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const getSubscriptionPlan = (subdata) => {
  API.post("/user/getplan", subdata);
};
export const checksubsciption = (subdata) => {
  API.delete("/user/deleteplan", subdata);
};

export const createpost = (postData) => {
  API.post("/post/create-post", postData);
};
export const createvedio = (postData) => {
  API.post("/post/create-vedio", postData);
};
export const getpost = () => API.get("/post/getpost");
export const getvedio = () => API.get("/post/getvedio");
export const getuserpost = (id) => API.get(`/post/userpost/${id}`);

export const addfriends = (id, value) => {
  API.put(`/user/following/${id}`, value);
};
export const deletefriends = (id, value) => {
  console.log("hello");
  API.put(`/user/removefollower/${id}`, value);
};

/*export const comments = (id, comment, userName) => {
  API.put(`/${id}/comment`, { comment, userName });
};*/
