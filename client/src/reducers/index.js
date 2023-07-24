import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./users";
import questionsReducer from "./questions";
import currentUserReducer from "./currentUser";
import paymentReducer from "./payment";
import currentPlanReducer from "./currentPlan";
import postReducer from "./posts";
export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  userReducer,
  paymentReducer,
  currentPlanReducer,
  postReducer,
});
