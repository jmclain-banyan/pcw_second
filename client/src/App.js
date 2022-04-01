import React, { Fragment } from "react";
import "./assets/style/main.css";
import "./assets/vendor/fontAwesome/css/all.css";
import { Navbar } from "./components/Navbar";
import { RegisterModal } from "./components/RegisterModal";
import { LoginModal } from "./components/LoginModal";
import { ProfileSettingsModal } from "./components/ProfileSettingsModal";
import { HomePage } from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { AdminPortal } from "./components/AdminPortal";
import { useSelector } from "react-redux";

//development
// import { CandyWarsApp } from './components/CandyWars/CandyWarsApp'

export const App = () => {
  const state = useSelector((state) => state);

  const authModals = (
    <Fragment>
      <LoginModal />
      <RegisterModal />
    </Fragment>
  );

  return (
    <div className="App">
      <Navbar />
      {!state.auth.isAuthenticated ? authModals : <ProfileSettingsModal />}
      {state.auth.isAuthenticated && state.auth.user.isAdmin ? (
        <AdminPortal />
      ) : state.auth.isAuthenticated && !state.auth.user.isAdmin ? (
        <Dashboard />
      ) : (
        <HomePage />
        // <CandyWarsApp />
      )}
    </div>
  );
};
