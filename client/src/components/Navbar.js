import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const toggleMenu = () => dispatch({ type: "TOGGLE_NAV_MENU" });

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <span>Candy</span>
        <span>Wars</span>
      </div>
      <div className="navbar-menu-btn">
        <button onClick={toggleMenu}>
          <div>☰</div>
        </button>
      </div>
      <SideMenu />
    </div>
  );
};

const openSide = {
  width: "180px",
};
const closeSide = {
  width: "0px",
};

const SideMenu = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const toggleMenu = () => dispatch({ type: "TOGGLE_NAV_MENU" });
  const registerModal = () => dispatch({ type: "TOGGLE_REGISTER_MODAL" });
  const loginModal = () => dispatch({ type: "TOGGLE_LOGIN_MODAL" });
  const profileModal = () => dispatch({ type: "TOGGLE_PROFILE_MODAL" });
  const logoutUser = () => dispatch({ type: "LOGOUT_SUCCESS" });
  const sideDisplay = state.nav.showSideMenu ? openSide : closeSide;

  const registerAndLogin = (
    <React.Fragment>
      <span className="nav-item" onClick={loginModal}>
        Login
      </span>
      <span className="nav-item" onClick={registerModal}>
        Register
      </span>
    </React.Fragment>
  );

  const logoutAndSettings = (
    <React.Fragment>
      <span className="nav-item" onClick={profileModal}>
        Profile setting
      </span>
      <span className="nav-item" onClick={logoutUser}>
        Logout
      </span>
    </React.Fragment>
  );

  return (
    <div className="side-menu" style={sideDisplay}>
      <span className="side-close-btn">
        <i className="fas fa-times fa-2x" onClick={toggleMenu}></i>
      </span>
      {state.auth.isAuthenticated ? logoutAndSettings : registerAndLogin}
    </div>
  );
};
