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

  return (
    <div>
      <button className="social-button" onClick={openModal}>
        share
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <h2>Share Time to Herd</h2>
        <div className="social-button-container">
          <EmailShareButton url="https://timetoherd.com">
            <EmailIcon size={32} round />
          </EmailShareButton>
          <TwitterShareButton url="https://timetoherd.com">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url="https://timetoherd.com">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton url="https://timetoherd.com">
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <LinkedinShareButton url="https://timetoherd.com">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url="https://timetoherd.com">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </Modal>
    </div>
  );
};
