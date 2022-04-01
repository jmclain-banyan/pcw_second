import { returnErrors } from "./errorActions";
import axios from "axios";
import { tokenConfig } from "./tokenConfig";
import { returnSuccessMsg } from "./successActions";

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

export const updateName = ({ id, name }) => (dispatch, getState) => {
  const body = JSON.stringify({ id, name });
  axios
    .post("/user/update/name", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "LOADING" });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setTimeout(() => {
        dispatch({ type: "LOADED" });
        dispatch(returnSuccessMsg(res.data.msg));
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: "LOADING" });
      setTimeout(() => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            err.response.statusText,
            "Update failure"
          )
        );
        dispatch({ type: "UPDATE_FAIL" });
        dispatch({ type: "LOADED" });
      }, 1500);
    });
};

export const updateEmail = ({ id, email }) => (dispatch, getState) => {
  const body = JSON.stringify({ id, email });
  axios
    .post("user/update/email", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "LOADING" });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setTimeout(() => {
        dispatch({ type: "LOADED" });
        dispatch(returnSuccessMsg(res.data.msg));
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: "LOADING" });
      setTimeout(() => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            err.response.statusText,
            "Update failure"
          )
        );
        dispatch({ type: "UPDATE_FAIL" });
        dispatch({ type: "LOADED" });
      }, 1500);
    });
};

export const updatePassword = ({
  id,
  oldPassword,
  newPassword,
  newPassword2,
}) => (dispatch, getState) => {
  const body = JSON.stringify({ id, oldPassword, newPassword, newPassword2 });
  axios
    .post("user/update/password", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "LOADING" });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setTimeout(() => {
        dispatch({ type: "LOADED" });
        dispatch(returnSuccessMsg(res.data.msg));
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: "LOADING" });
      setTimeout(() => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            err.response.statusText,
            "Update failure"
          )
        );
        dispatch({ type: "UPDATE_FAIL" });
        dispatch({ type: "LOADED" });
      }, 1500);
    });
};

export const deleteProfile = ({id, confirmationPassword}) => (dispatch, getState) => {
  const body = JSON.stringify({ id, confirmationPassword })
  console.log(body)
  axios
    .post(`/user/update/delete/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({type: "LOADING" })
      setTimeout(() => {
        dispatch({ type: "LOADED" })
        dispatch({ type: "LOGOUT_SUCCESS"})
        dispatch(returnSuccessMsg(res.data.msg))
      }, 2500);
    })
    .catch((err) => {
      dispatch({ type: 'LOADING' })
      setTimeout(() => {
        dispatch(returnErrors(err.response.data, err.response.status, err.response.statusText, 'Failure'))
        dispatch({ type: 'UPDATE_FAIL' })
        dispatch({ type: 'LOADED' })
      }, 1000)
    });
};
