import React from "react";
import "./supporters.css";

export const Supporters = () => {
  return (
    <>
      <h1>Project Support</h1>
      <div className="supporters-container">
        <div className="item">
          <h2>Developed By:</h2>
          <span>
            <a
              className="supporter-link"
              href="https://twitter.com/PeterGriggs"
              target="_blank"
            >
              @PeterGriggs
            </a>
          </span>
        </div>
        <div className="item">
          <h2>Funded By:</h2>
          <span>
            <a href="https://deepai.org" target="_blank">
              <img
                className="deepai-logo"
                src="DeepAI-logo-transparent-white-text.png"
                alt="DeepAI's logo"
              ></img>
            </a>
          </span>
        </div>
        <div className="item">
          <h2>Open Data From:</h2>
          <span>
            <a href="https://ourworldindata.org/" target="_blank">
              <img
                className="deepai-logo"
                src="https://avatars3.githubusercontent.com/u/14187135?s=200&v=4"
                alt="Our World in Data's logo"
              ></img>
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
