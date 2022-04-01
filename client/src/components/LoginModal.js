import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import { ErrorMessage } from "./AlertMessages";
import { LoadSpinner } from "./LoadSpinner";

const show = {
  display: "block",
};
const hide = {
  display: "none",
};

export const LoginModal = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const toggleModal = () => dispatch({ type: "TOGGLE_LOGIN_MODAL" });
  const toggleDisplay = state.nav.showLoginModal ? show : hide;

  const submitForm = (e) => {
    let user = { email, password };
    dispatch(login(user));
    e.preventDefault();
  };

  // const loginModalContents = (
  //   <div className="login-modal-container" style={toggleDisplay}>
  //     <div className="content">
  //       <i
  //         className="fas fa-times fa-2x close-modal-btn"
  //         onClick={toggleModal}
  //       ></i>
  //       <div className="modal-header">
  //         <h3>Login</h3>
  //         {state.error.msg ? <ErrorMessage /> : null}
  //       </div>
  //       <div className="modal-body" onSubmit={submitForm}>
  //         <form action="/user/login">
  //           <div className="form-group">
  //             <label htmlFor="email">Email</label>
  //             <input
  //               type="email"
  //               name="email"
  //               onChange={(e) => getEmail(e.target.value)}
  //               placeholder="enter email"
  //               required
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="password">Password</label>
  //             <input
  //               type="password"
  //               name="password"
  //               onChange={(e) => getPassword(e.target.value)}
  //               placeholder="enter password"
  //               required
  //             />
  //           </div>
  //           <div className="rl-btn-container">
  //             <button className="rl-btn" type="submit">
  //               Login
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //       <div className="modal-footer">
  //         <span>Don't have an account? </span>
  //         <span
  //           onClick={() => {
  //             dispatch({ type: "TOGGLE_LOGIN_MODAL" });
  //             dispatch({ type: "TOGGLE_REGISTER_MODAL" });
  //           }}
  //         >
  //           Register here.
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // )
  const modalBody = (
    <form action="/user/login" onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => getEmail(e.target.value)}
          placeholder="enter email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => getPassword(e.target.value)}
          placeholder="enter password"
          required
        />
      </div>
      <div className="rl-btn-container">
        <button className="rl-btn" type="submit">
          Login
        </button>
      </div>
    </form>
  );

  const modalFooter = (
    <div className="modal-footer">
          <span>Don't have an account? </span>
          <span
            onClick={() => {
              dispatch({ type: "TOGGLE_LOGIN_MODAL" });
              dispatch({ type: "TOGGLE_REGISTER_MODAL" });
            }}
          >
            Register here.
          </span>
        </div>
  )

  return (
    // <Fragment>
    //   {!state.nav.isLoading ? loginModalContents : <LoadSpinner/> }
    // </Fragment>
    <div className="login-modal-container" style={toggleDisplay}>
      <div className="content">
        <i
          className="fas fa-times fa-2x close-modal-btn"
          onClick={toggleModal}
        ></i>
        <div className="modal-header">
          <h3>Login</h3>
          {state.error.msg ? <ErrorMessage /> : null}
        </div>
        <div className="modal-body" >
          {/* <form action="/user/login">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => getEmail(e.target.value)}
                placeholder="enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => getPassword(e.target.value)}
                placeholder="enter password"
                required
              />
            </div>
            <div className="rl-btn-container">
              <button className="rl-btn" type="submit">
                Login
              </button>
            </div>
  </form> */}
          {state.nav.isLoading ? <LoadSpinner /> : modalBody}
        </div>
        {state.nav.isLoading ? null : modalFooter}
        {/* <div className="modal-footer">
          <span>Don't have an account? </span>
          <span
            onClick={() => {
              dispatch({ type: "TOGGLE_LOGIN_MODAL" });
              dispatch({ type: "TOGGLE_REGISTER_MODAL" });
            }}
          >
            Register here.
          </span>
        </div> */}
      </div>
    </div>
  );
};
