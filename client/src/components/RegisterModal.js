import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
import { register } from "../actions/authActions";
import { ErrorMessage } from "./AlertMessages";
import { LoadSpinner } from "./LoadSpinner";

const show = {
  display: "block",
};
const hide = {
  display: "none",
};

export const RegisterModal = () => {
  const [name, getName] = useState("");
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [password2, getPassword2] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const toggleModal = () => dispatch({ type: "TOGGLE_REGISTER_MODAL" });
  const toggleDisplay = state.nav.showRegisterModal ? show : hide;

  const submitForm = (e) => {
    e.preventDefault();
    let newUser = { name, email, password, password2 };
    dispatch(register(newUser));
  };

  // const registerModalContents = (
  //   <div className="register-modal-container" style={toggleDisplay}>
  //     <div className="content">
  //       <i
  //         className="fas fa-times fa-2x close-modal-btn"
  //         onClick={toggleModal}
  //       ></i>
  //       <div className="modal-header">
  //         <h3>Register</h3>
  //         {state.error.msg ? <ErrorMessage /> : null}
  //       </div>
  //       <div className="modal-body">
  //         <form action="/user/register" method="POST" onSubmit={submitForm}>
  //           <div className="form-group">
  //             <label htmlFor="name">Name</label>
  //             <input
  //               type="text"
  //               name="name"
  //               placeholder="enter name"
  //               onChange={(e) => getName(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="email">Email</label>
  //             <input
  //               type="email"
  //               name="email"
  //               placeholder="enter email"
  //               onChange={(e) => getEmail(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="password">Password</label>
  //             <input
  //               type="password"
  //               name="password"
  //               placeholder="enter password"
  //               onChange={(e) => getPassword(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="password2">Confirm password</label>
  //             <input
  //               type="password"
  //               name="password2"
  //               placeholder="confirm password"
  //               onChange={(e) => getPassword2(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="rl-btn-container">
  //             <button className="rl-btn" type="submit">
  //               Register
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //       <div className="modal-footer">
  //         <span>Already have an account? </span>
  //         <span
  //           onClick={() => {
  //             dispatch({ type: "TOGGLE_REGISTER_MODAL" });
  //             dispatch({ type: "TOGGLE_LOGIN_MODAL" });
  //           }}
  //         >
  //           Login here.
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );
  const modalBody = (
    <form action="/user/register" method="POST" onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          onChange={(e) => getName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="enter email"
          onChange={(e) => getEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="enter password"
          onChange={(e) => getPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password2">Confirm password</label>
        <input
          type="password"
          name="password2"
          placeholder="confirm password"
          onChange={(e) => getPassword2(e.target.value)}
          required
        />
      </div>
      <div className="rl-btn-container">
        <button className="rl-btn" type="submit">
          Register
        </button>
      </div>
    </form>
  );

  const modalFooter = (
    <div className="modal-footer">
          <span>Already have an account? </span>
          <span
            onClick={() => {
              dispatch({ type: "TOGGLE_REGISTER_MODAL" });
              dispatch({ type: "TOGGLE_LOGIN_MODAL" });
            }}
          >
            Login here.
          </span>
        </div>
  )

  return (
    // <Fragment>
    //   {!state.nav.isLoading ? registerModalContents : <LoadSpinner/>}
    // </Fragment>
    <div className="register-modal-container" style={toggleDisplay}>
      <div className="content">
        <i
          className="fas fa-times fa-2x close-modal-btn"
          onClick={toggleModal}
        ></i>
        <div className="modal-header">
          <h3>Register</h3>
          {state.error.msg ? <ErrorMessage /> : null}
        </div>
        <div className="modal-body">
          {state.nav.isLoading ? <LoadSpinner/> : modalBody}
          {/* <form action="/user/register" method="POST" onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="enter name"
                onChange={(e) => getName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="enter email"
                onChange={(e) => getEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="enter password"
                onChange={(e) => getPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm password</label>
              <input
                type="password"
                name="password2"
                placeholder="confirm password"
                onChange={(e) => getPassword2(e.target.value)}
                required
              />
            </div>
            <div className="rl-btn-container">
              <button className="rl-btn" type="submit">
                Register
              </button>
            </div>
          </form> */}
        </div>
        {state.nav.isLoading ? null : modalFooter}
        {/* <div className="modal-footer">
          <span>Already have an account? </span>
          <span
            onClick={() => {
              dispatch({ type: "TOGGLE_REGISTER_MODAL" });
              dispatch({ type: "TOGGLE_LOGIN_MODAL" });
            }}
          >
            Login here.
          </span>
        </div> */}
      </div>
    </div>
  );
};
