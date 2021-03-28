import React, { useState } from "react";
import Modal from "react-modal";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import "./social-sharing.css";

export const SocialSharingButton = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const currentUrl = window.location;

  return (
    <div>
      <button type="button" className="social-button" onClick={openModal}>
        share
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <h2>Share Time to Herd</h2>
        <div className="social-button-container">
          <EmailShareButton url={currentUrl}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={currentUrl}>
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <LinkedinShareButton url={currentUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={currentUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </Modal>
    </div>
  );
};
