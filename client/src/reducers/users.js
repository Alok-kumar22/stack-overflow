const userReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "UPDATE_CURRENT_USER":
      return state.map((state) =>
        state._id === action.payload._id ? action.payload : state
      );
    default:
      return state;
  }
};

export default userReducer;
