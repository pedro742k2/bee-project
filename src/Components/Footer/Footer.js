import React, { useState, useEffect } from "react";
import RemoveParticlesImg from "../../Assets/remove-particles.svg";
import "./Footer.css";

const Footer = () => {
  const [removeParticles, setRemoveParticles] = useState(false);

  const disableParticles = () => {
    document
      .getElementsByClassName("particles")[0]
      ?.classList.toggle("disable");

    setRemoveParticles(!removeParticles);
  };

  useEffect(() => {
    document.getElementsByClassName("particles")[0].classList[1] === "disable"
      ? setRemoveParticles(true)
      : setRemoveParticles(false);
  }, [removeParticles]);

  return (
    <div className="footer">
      <span className="credits">Copyright: Pedro Batista and EST/IPCB</span>
      <button onClick={disableParticles} className="disable-particles">
        <img className="rm-particles-img" alt="" src={RemoveParticlesImg}></img>
        <span>
          {removeParticles ? "Enable particles" : "Disable particles"}
        </span>
      </button>
    </div>
  );
};

export default Footer;
