import React, { useEffect } from "react";
import "./FullscreenAlert.css";
import warningIcon from "../../Assets/warning.svg";
import { Fragment } from "react";

const FullScreenAlert = ({ confirmEdit, message }) => {
  useEffect(() => {
    const App = document.getElementsByClassName("App")[0];
    App.classList.add("blur");

    return () => {
      App.classList.remove("blur");
    };
  }, []);

  return (
    <Fragment>
      <div className="fullscreen-alert">
        <p className="title">
          <img alt="" src={warningIcon} />
          ALERT
        </p>

        <p className="message">
          {message}
          <br />
          This action can't be reversed!
        </p>

        <div className="prompt">
          <p>Do you really want to continue?</p>
          <div className="buttons">
            <button className="no" onClick={() => confirmEdit(false)}>
              No
            </button>
            <button className="yes" onClick={() => confirmEdit(true)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FullScreenAlert;
