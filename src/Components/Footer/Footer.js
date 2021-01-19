import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [removeParticles, setRemoveParticles] = useState(false);

  const disableParticles = () => {
    document.getElementsByClassName("particles")[0].classList.toggle("disable");

    setRemoveParticles(!removeParticles);
  };

  return (
    <div className="footer">
      <span className="credits">Copyright: Pedro Batista and EST/IPCB</span>
      <button onClick={disableParticles} className="disable-particles">
        {removeParticles ? "Enable particles" : "Disable particles"}
      </button>
    </div>
  );
};

export default Footer;
