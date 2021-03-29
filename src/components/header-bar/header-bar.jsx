import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { SocialSharingButton } from "../social-sharing/social-sharing-button";

export const HeaderBar = ({ showBackButton }) => {
  return (
    <header>
      {showBackButton && (
        <a href="/" style={{ color: "#fff", fontSize: "28px" }}>
          <ArrowLeftOutlined />
        </a>
      )}
      <nav>
        <a href="/supporters">Supporters</a>
        <a href="/methodology">Methodology</a>
        <SocialSharingButton />
      </nav>
    </header>
  );
};
