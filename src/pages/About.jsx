import React, { useState, useEffect } from 'react';

import UserIcon from "../assets/img/user-icon.jpg";


const About = () => {

    const [iconClass, setIconClass] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setIconClass("show-icon")
        }, 300);
    }, [])

    return (
        <div className="about flex column align-center space-start">
            <img src={UserIcon} alt="" className={`utils-user-icon ${iconClass}`} />
            <p className="about-name">Tal Tarablus</p>
            <a className="about-link" href="https://github.com/taltara" target="_blank" rel="noopener noreferrer" >GitHub</a>
        </div>
    )
}

export default About
