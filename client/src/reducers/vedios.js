const vedioReducer = (state = { data: null }, action) => {
  switch (action?.type) {
    case "CREATED_VEDIO":
      return { ...state };
    case "FETCH_ALL_VEDIOS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default vedioReducer;
