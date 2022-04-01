const initialState = {
  msg: null,
  status: null,
  statusText: null,
  id: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
        const { status, statusText, id } = action.payload
      return {
        msg: action.payload.msg.msg,
        status,
        statusText,
        id
      };

    case "CLEAR_ERRORS":
      return {
        msg: null,
        status: null,
        statusText: null,
        id: null,
      };

    default:
      return state;
  }
};
