import React, { useEffect } from "react";
import "./FullscreenAlert.css";
import "./FullscreenAlertResponsive.css";
import warningIcon from "../../Assets/warning.svg";
import { Fragment } from "react";

const FullScreenAlert = ({ confirmEdit, message }) => {
  useEffect(() => {
    const overflow = document.querySelector("*");

    overflow.style.overflow = "hidden";

    return () => {
      overflow.style.overflow = "auto";
    };
  }, []);

  return (
    <Fragment>
      <div className="fullscreen-alert">
        <p className="title">
          <img alt="" src={warningIcon} />
          ALERT
        </p>

        <p className="message">{message}</p>

        <p className="message static">This action can't be reversed!</p>

        <div className="prompt">
          <p>Do you really want to continue?</p>
          <div className="buttons">
            <button className="no" onClick={() => confirmEdit(false)}>
              Cancel
            </button>
            <button className="yes" onClick={() => confirmEdit(true)}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FullScreenAlert;
