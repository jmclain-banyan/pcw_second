export const tokenConfig = (getState) => {
  // get token from local storage
  const token = getState().auth.token;
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // if token exists, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
