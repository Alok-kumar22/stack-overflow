import * as api from "../api/";
import { setcurrentplan } from "./Currentplan";

export const getSubscription = (subdata) => async (dispatch) => {
  try {
    const { data } = await api.getSubscriptionPlan(subdata);
    console.log(data);
    dispatch({ type: "SUBSCRIPTION_PLAN", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const checkSubscription = (subdata) => async (dispatch) => {
  try {
    const { data } = await api.checksubsciption(subdata);
    console.log(data.data);

    dispatch({
      type: "CHECK_SUBSCRIPTION",
      payload: data,
    });
    dispatch(setcurrentplan(data));
  } catch (error) {
    console.log(error);
  }
};
