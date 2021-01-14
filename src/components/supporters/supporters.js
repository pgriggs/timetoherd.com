import React from "react";
import "./supporters.css";

export const Supporters = () => {
  return (
    <>
      <h1>Project Support</h1>
      <div className="supporters-container">
        <div className="item">
          <h2>Built by:</h2>
          <span>
            <a
              className="supporter-link"
              href="https://twitter.com/PeterGriggs"
              target="_blank"
            >
              @PeterGriggs
            </a>
          </span>
          <span>
            <a href="https://deepai.org" target="_blank">
              <img
                className="deepai-logo"
                src="DeepAI-logo-transparent-white-text.png"
                alt="DeepAI's logo"
               />
            </a>
          </span>
        </div>
        <div className="item">
          <h2>Open data from:</h2>
          <span>
            <a href="https://ourworldindata.org/" target="_blank">
              <img
                className="deepai-logo"
                src="https://avatars3.githubusercontent.com/u/14187135?s=200&v=4"
                alt="Our World in Data's logo"
               />
            </a>
          </span>
          <span>
            <a
              className="supporter-link"
              target="_blank"
              href="https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations"
            >
              View data used by TimeToHerd
            </a>
          </span>
        </div>
        <div className="item">
          <h2>Github contributors:</h2>
          <span>
            <a
              className="supporter-link"
              href="https://github.com/bdunks"
              target="_blank"
            >
              @dbunks
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
