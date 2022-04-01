export const returnErrors = ( msg, status, statusText, id ) => {
  return {
    type: "GET_ERRORS",
    payload: { msg, status, statusText, id },
  };
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
