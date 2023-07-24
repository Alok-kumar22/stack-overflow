import React from "react";
import * as api from "../api/";

export const askQuestion = (questionData) => async (dispatch) => {
  try {
    const data = await api.postQuestion(questionData);
    dispatch({
      type: "POST_QUESTION",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllQuestion = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (answerdata) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerdata;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,
      userId
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestion());
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    const { data } = await api.deleteAnswer(id, answerId, noOfAnswers);
    dispatch(fetchAllQuestion());
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value, userId);
  } catch (error) {
    console.log(error);
  }
};
