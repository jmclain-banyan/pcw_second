const initialState = {
  msg: null,
};

export const successReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUCCESS_MSG":
      return {
        ...state,
        ...action.payload
      };
    case "CLEAR_SUCCESS_MSG":
      return {
        ...state,
        msg: null,
      };
    default:
      return state;
  }
};
