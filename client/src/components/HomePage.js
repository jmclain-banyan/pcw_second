import React from "react";
import { useSelector } from "react-redux";
import { SuccessMessage } from "./AlertMessages";

export const HomePage = () => {
  const state = useSelector((state) => state);
  return (
    <div className="home-page">
      {state.success.msg ? <SuccessMessage /> : null}
      <div className="hero">
        <h1>Welcome to the CandyWars Game</h1>
        <p>
          Just a fun game to buy and sell some candy and try to make a profit.
        </p>
      </div>
      <div className="social">
        <span>Join our social media</span>
        <div className="social-links">
          <i className="fab fa-facebook-f" />
          <i className="fab fa-instagram" />
          <i className="fab fa-twitter" />
          <i className="fab fa-snapchat-ghost" />
        </div>
      </div>
      <div className="author">
        <h3>Created by</h3>
        <div className="author-info">
        <span>JMcLain@CitrusCodeDevelopment.net</span>
          <div className="author-info-links">
            <i className="fab fa-linkedin-in" />
            <i className="fab fa-github" />
            <i className="fab fa-google-plus-g" />
          </div>
        </div>
        </div>
        <div className="tech-stack">
          <span>Technologies used for this app</span>
          <div className="tech-stack-logos">
            <i className="fab fa-html5" />
            <i className="fab fa-js" />
            <i className="fab fa-sass" />
            <i className="fab fa-react" />
            <i className="fab fa-node" />
          </div>
        </div>
        <footer>CCD &copy; 2020</footer>
      </div>
  );
};
