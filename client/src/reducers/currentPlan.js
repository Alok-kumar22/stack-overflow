const currentPlanReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_PLAN":
      return action.payload;
    default:
      return state;
  }
};

export default currentPlanReducer;
