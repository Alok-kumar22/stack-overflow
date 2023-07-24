const paymentReducer = (state = null, action) => {
  switch (action.type) {
    case "SUBSCRIPTION_PLAN":
      return action.payload;
    case "CHECK_SUBSCRIPTION":
      return action.payload;
    default:
      return state;
  }
};

export default paymentReducer;
