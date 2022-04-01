import axios from "axios";
import { returnErrors } from "./errorActions";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const register = ({ name, email, password, password2 }) => (
  dispatch
) => {
  const body = JSON.stringify({ name, email, password, password2 });
  // console.log(body)
  axios
    .post("/user/register", body, config)
    .then((res) => {
      dispatch({ type: "LOADING" });
      setTimeout(() => {
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        dispatch({ type: "TOGGLE_REGISTER_MODAL" });
        dispatch({type: "CLEAR_ERRORS"})
        dispatch({ type: "LOADED" });
      }, 1000);
    })
    // .catch(err => console.log(err.response.status))
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          err.response.statusText,
          "Registration failure"
        )
      );
      dispatch({ type: "REGISTER_FAIL" });
    });
};

export const login = ({ email, password }) => (dispatch) => {
  const body = JSON.stringify({ email, password });

  axios
    .post("/user/login", body, config)
    .then((res) => {
      dispatch({ type: "LOADING" })
      setTimeout(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
        dispatch({ type: "TOGGLE_LOGIN_MODAL" });
        dispatch({type: "CLEAR_ERRORS"})
        dispatch({ type: "LOADED" })
      }, 1000);
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          err.response.statusText,
          "Login failure"
        )
      );
      dispatch({ type: "LOGIN_FAIL" });
    });
};
