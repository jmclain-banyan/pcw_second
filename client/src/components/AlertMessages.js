import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../actions/errorActions";
import { clearSuccessMsg } from "../actions/successActions";

export const ErrorMessage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const dismissMessage = () => dispatch(clearErrors());
  return (
    <div className="alert-error">
      <div className="message">
        {/* <span className="status">{state.error.status} </span>
        <span className="status-text">{state.error.statusText} </span> */}
        <span className="status-id">{state.error.id} </span>
        <span className="status-msg">{state.error.msg} </span>
      </div>
      <i className="fas fa-times dismiss-btn" onClick={dismissMessage}></i>
    </div>
  );
};

export const SuccessMessage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const dismissMessage = () => dispatch(clearSuccessMsg());
  return (
    <div className="alert-success">
      <div className="message">
        <span className="status-msg">{state.success.msg}</span>
      </div>
        <i className="fas fa-times dismiss-btn" onClick={dismissMessage}></i>
    </div>
  );
};
