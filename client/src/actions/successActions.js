export const returnSuccessMsg = (msg) => {
  return {
    type: "GET_SUCCESS_MSG",
    payload: { msg },
  };
};

export const clearSuccessMsg = () => {
  return {
    type: "CLEAR_SUCCESS_MSG",
  };
};
