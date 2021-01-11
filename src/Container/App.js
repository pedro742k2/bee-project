import "./App.css";
import React from "react";
import Routes from "../routes";
import Particles from "react-particles-js";
import particleParams from "../Settings/ParticleSettings";

const App = () => {
  return (
    <div>
      <Particles params={particleParams} className="particles" />
      <Routes />
    </div>
  );
};

export default App;
