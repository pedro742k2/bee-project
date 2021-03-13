import "./App.css";
import React, { useEffect } from "react";
import Routes from "../routes";
import Particles from "react-particles-js";
import particleParams from "../Settings/ParticleSettings";

const App = () => {
  const particlesState = localStorage.getItem("particlesState");

  useEffect(() => {
    const particles = document.getElementById("tsparticles");

    console.log(particlesState);

    particlesState === "true"
      ? particles.classList.add("disable")
      : particles.classList.remove("disable");
  }, [particlesState]);

  return (
    <div className="App">
      <Particles params={particleParams} className="particles" />
      <Routes />
    </div>
  );
};

export default App;
