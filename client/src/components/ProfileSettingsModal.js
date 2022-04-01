import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage, SuccessMessage } from "./AlertMessages";
import { LoadSpinner } from "./LoadSpinner";
import {
  updateName,
  updateEmail,
  updatePassword,
  deleteProfile,
} from "../actions/updateActions";

const show = {
  display: "block",
};
const hide = {
  display: "none",
};

export const ProfileSettingsModal = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  let [editName, showNameInput] = useState(false);
  let [name, getNewName] = useState("");
  let [editEmail, showEmailInput] = useState(false);
  let [email, getNewEmail] = useState("");
  let [editPassword, showPasswordInput] = useState(false);
  let [oldPassword, getOldPass] = useState("");
  let [newPassword, getNewPassword] = useState("");
  let [newPassword2, getNewPassword2] = useState("");
  let [confirmDelete, showDeleteOption] = useState(false);
  let [confirmDelete2, showConfirmDelete2] = useState(false);
  let [confirmationPassword, getConfirmationPassword] = useState("");
  
  const id = state.auth.user.id;

  const toggleModal = () => dispatch({ type: "TOGGLE_PROFILE_MODAL" });
  const toggleDisplay = state.nav.showProfileSettingsModal ? show : hide;

  const submitUpdatedName = (e) => {
    e.preventDefault();
    dispatch(updateName({ id, name }));
    showNameInput(false);
    getNewName("");
  };

  const submitUpdatedEmail = (e) => {
    e.preventDefault();
    dispatch(updateEmail({ id, email }));
    showEmailInput(false);
    getNewEmail("");
  };

  const submitUpdatedPassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ id, oldPassword, newPassword, newPassword2 }));
    showPasswordInput(false);
    getOldPass("");
    getNewPassword("");
    getNewPassword2("");
  };

  const submitDeleteProfile = (e) => {
    e.preventDefault();
    dispatch(deleteProfile({ id, confirmationPassword }));
    showDeleteOption(false);
  };

  const editNameForm = (
    <Fragment>
      <form
        className="name-form"
        action="/user/update/name"
        onSubmit={submitUpdatedName}
        method="post"
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => getNewName(e.target.value)}
          placeholder="enter new name"
        />
        <button type="submit">Update</button>
      </form>
    </Fragment>
  );

  const editEmailForm = (
    <Fragment>
      <form
        className="email-form"
        action="/user/update/email"
        onSubmit={submitUpdatedEmail}
        method="post"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => getNewEmail(e.target.value)}
          placeholder="enter new email"
        />
        <button type="submit">Update</button>
      </form>
    </Fragment>
  );

  const editPasswordForm = (
    <Fragment>
      <form
        className="password-form"
        action="/user/update/password"
        onSubmit={submitUpdatedPassword}
        method="post"
      >
        <input
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={(e) => getOldPass(e.target.value)}
          placeholder="enter old password"
        />
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => getNewPassword(e.target.value)}
          placeholder="enter new password"
        />
        <input
          type="password"
          name="newPassword2"
          value={newPassword2}
          onChange={(e) => getNewPassword2(e.target.value)}
          placeholder="confirm new password"
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </Fragment>
  );

  const confirmDeleteBtns = (
    <Fragment>
      <button onClick={() => showConfirmDelete2(!confirmDelete2)}>YES</button>
      <button onClick={() => showDeleteOption(!confirmDelete)}>NO</button>
    </Fragment>
  );

  const confirmDeletePassword = (
    <div className="confirm-delete">
      <input
        type="password"
        name='password'
        value={confirmationPassword}
        onChange={(e) => getConfirmationPassword(e.target.value)}
        placeholder='Confirm password to delete profile'
      />
      <button type="submit">Remove my profile</button>
      <button onClick={() => showConfirmDelete2(!confirmDelete2)}>
        Cancel
      </button>
    </div>
  );

  const confirmProfileDelete = (
    <Fragment>
      <form
        className="delete-form"
        action={`/user/update/delete/${id}`}
        onSubmit={submitDeleteProfile}
        method="post"
      >
        <h3>Are you sure you want to delete your profile?</h3>
        {!confirmDelete2 ? confirmDeleteBtns : confirmDeletePassword}
      </form>
    </Fragment>
  );

  const btn1 = {
    background: "#007bff",
  };
  const btn2 = {
    background: "#df382c",
  };

  const profileSettingContainer = (
    <Fragment>
      <div className="form-group user-name">
        <span className="info-wrapper">
          <span>Name: </span>
          <span>{state.auth.user.name}</span>
        </span>
        <button
          className="edit-btn"
          onClick={() => showNameInput(!editName)}
          style={!editName ? btn1 : btn2}
        >
          <i className={!editName ? "fas fa-user-edit" : "fas fa-times"}></i>
          {!editName ? " edit" : " cancel"}
        </button>
        {editName ? editNameForm : null}
      </div>
      <div className="form-group user-email">
        <span className="info-wrapper">
          <span>Email: </span>
          <span>{state.auth.user.email}</span>
        </span>
        <button
          className="edit-btn"
          onClick={() => showEmailInput(!editEmail)}
          style={!editEmail ? btn1 : btn2}
        >
          <i className={!editEmail ? "fas fa-user-edit" : "fas fa-times"}></i>
          {!editEmail ? " edit" : " cancel"}
        </button>
        {editEmail ? editEmailForm : null}
      </div>
      <div className="form-group user-password">
        <button
          className="pass-btn"
          onClick={() => showPasswordInput(!editPassword)}
          style={!editPassword ? btn1 : btn2}
        >
          {!editPassword ? "Update Password" : "Cancel Password Update"}
        </button>
        {editPassword ? editPasswordForm : null}
      </div>
      <div className="form-group user-delete">
        {!confirmDelete ? (
          <button
            className="delete-btn"
            onClick={() => showDeleteOption(!confirmDelete)}
          >
            Delete my profile <i className="fas fa-trash-alt"></i>
          </button>
        ) : (
          confirmProfileDelete
        )}
      </div>
    </Fragment>
  );

  return (
    <div className="profile-settings-modal-container" style={toggleDisplay}>
      <div className="content">
        <i
          className="fas fa-times fa-2x close-modal-btn"
          onClick={toggleModal}
        ></i>
        <div className="modal-header">
          <h3>Profile Settings</h3>
          {state.error.msg ? <ErrorMessage /> : null}
          {state.success.msg ? <SuccessMessage /> : null}
        </div>
        <div className="modal-body">
          {state.nav.isLoading ? null : <h4>Your account info</h4>}
          {state.nav.isLoading ? <LoadSpinner /> : profileSettingContainer}
        </div>
      </div>
    </div>
  );
};
