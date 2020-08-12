import React, { useState, useEffect } from "react";

import "./_TiltButton.scss";

import Tilt from "react-tilt";
import { NavLink } from "react-router-dom";

const TiltButton = (props) => {
  let buttonRef = [];

  const {
    label,
    linkTo,
    activeLink,
    activeLinkClass,
    // ActiveLinkColor,
    isLinkToExact,
    isTilt,
    tiltOptions,
    tiltClass,
    buttonClass,
    titleClass,
    buttonStyle,
    buttonType,
    animation,
    onClick,
    theme,
    disabled,
  } = props;

  const [tiltTypeClass, setTiltTypeClass] = useState("");
  const [innerTiltTypeClass, setInnerTiltTypeClass] = useState("");
  const [titleTypeClass, setTitleTypeClass] = useState("");
  const [buttonTypeStyle, setButtonTypeStyle] = useState({});

  useEffect(() => {
    setButtonRippleListeners(animation);
    styleButtonByType();
  }, []);

  const styleButtonByType = () => {
    // setTiltTypeClass({});

    // setInnerTiltTypeClass({});

    // setTitleTypeClass({});

    setButtonTypeStyle({});
  };

  const setButtonRippleListeners = (name = "general") => {
    [].map.call([buttonRef], (el) => {
      el.addEventListener("click", (e) => {
        e = e.touches ? e.touches[0] : e;
        const r = el.getBoundingClientRect(),
          d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
        el.style.cssText = `--s: 0; --o: 1;`;
        // eslint-disable-next-line no-unused-expressions
        el.offsetTop;
        el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
          e.clientX - r.left
        }; --y:${e.clientY - r.top};`;
      });
    });
  };

  const setButtonRef = (element) => {
    buttonRef = element;
  };

  const isActiveButton = () => {
    if (label === "home") {
      if (activeLink === "" || activeLink === "home") return true;
    } else {
      if (activeLink === label) return true;
    }

    return false;
  };

  // const ButtonContentWrapper = (el) => {
  //   if (isTilt) {
  //     return (
  //       <Tilt
  //         className={`Tilt ${tiltTypeClass} ${tiltClass && tiltClass}`}
  //         options={{ ...tiltOptions }}
  //       >
  //         {el}
  //       </Tilt>
  //     );
  //   } else {
  //     return (
  //       <div className={`${tiltTypeClass} ${tiltClass && tiltClass}`}>{el}</div>
  //     );
  //   }
  // };

  const isType = (type) => type === buttonType;

  let allButtonStyle = buttonStyle ? buttonStyle : {};
  const disabledButtonStyle = disabled ? { pointerEvents: "none" } : {};
  allButtonStyle = { ...allButtonStyle, ...disabledButtonStyle };
  let allButtonClass =
    buttonClass && buttonClass !== "tilt-button" ? buttonClass : "";
  allButtonClass += theme === "dark" ? " button-light" : " button-dark";
  const tiltOptionSet = !isTilt ? { max: 0 } : {};
  // console.log(`active: "${activeLink}"`, label);
  const isActive = isActiveButton();

  return (
    <NavLink exact={isLinkToExact} to={`/${linkTo}`}>
      {/* {ButtonContentWrapper( */}
      <Tilt
        className={`Tilt ${tiltTypeClass} ${tiltClass && tiltClass}`}
        options={{ ...tiltOptions, ...tiltOptionSet }}
      >
        <li
          className={`Tilt-inner tilt-button ${innerTiltTypeClass} ${allButtonClass} ${
            isType("link") && isActive ? activeLinkClass : ""
          }`}
          onClick={onClick}
          anim={animation && animation}
          ref={setButtonRef}
          style={{ ...allButtonStyle }}
        >
          <p className={`${titleClass} ${titleTypeClass}`}>{label}</p>
        </li>
      </Tilt>
      {/* )} */}
    </NavLink>
  );
};

export default TiltButton;
