import React, { useState, useEffect } from "react";

import UserIcon from "../assets/img/user-icon.jpg";

import Tilt from "react-tilt";

const About = () => {
  const [iconClass, setIconClass] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIconClass("show-icon");
    }, 300);
  }, []);

  return (
    <div className="about flex column align-center space-start">
      <Tilt
        className="Tilt description-return-container"
        options={{ scale: 1.1, perspective: 500 }}
        reverse={true}
      >
        <img src={UserIcon} alt="" className={`utils-user-icon ${iconClass}`} />
      </Tilt>
      <p className="about-name">Tal Tarablus</p>
      <a
        className="about-link flex align-center space-center"
        href="https://github.com/taltara"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  );
};

export default About;
