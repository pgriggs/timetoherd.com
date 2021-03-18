import React from "react";

import "./media-features.css";

export const MediaFeatures = () => {
  return (
    <div className="media-features-section">
      <h2 className="features-section-header">As featured on</h2>
      <div className="logos-list">
        <div className="feature">
          <img src="/la-tercera-logo.png" />
        </div>
        <div className="feature">
          <img src="/el-financiero-logo.svg" />
        </div>
        <div className="feature">
          <img src="/la-politica-online-logo.png" />
        </div>
        <div className="feature">
          <img src="/imagen-tv-logo.png" />
        </div>
        <div className="feature">
          <img src="/24-horas-logo.png" />
        </div>
        <div className="feature">
          <img src="/tvn-buenos-dias-a-todos-logo.png" />
        </div>
      </div>
    </div>
  );
};
