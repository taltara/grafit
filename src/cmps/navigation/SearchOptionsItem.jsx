import React, { useState, useEffect } from "react";

import { useSpring, animated } from "react-spring";
import Tilt from "react-tilt";

function SearchOptionsItem(props) {
  const { item, index, onMediaPick, itemClass, picked } = props;

  const [key, setKey] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [showingItem, setShowingItem] = useState({});
  const [entranceClass, setEntranceClass] = useState("start");
  const [exitClass, setExitClass] = useState("");

  const getAnimationDelay = () => {
    const baseMs = 100;
    const delayBump = 150;
    return baseMs + (index + 1) * delayBump;
  };

  const [itemDelay, setItemDelay] = useState(getAnimationDelay());

  useEffect(() => {
    
    // return setTimeout(() => {
    //   setExitClass("preview-exit");
    // }, itemDelay / 3);
  }, []);

  useEffect(() => {
    if(showingItem) {

      const timeout =
        entranceClass === "start" || entranceClass === "preview-entrance"
          ? 100
          : 600;
      if (entranceClass !== "") {
        setEntranceClass("");
        setTimeout(() => {
          setEntranceClass("preview-entrance");
        }, timeout);
      }
    }
  }, [showingItem]);

  useEffect(() => {
    if (picked !== "") {
      if (picked === index) {
        setExitClass("preview-exit");
      } else {
        setTimeout(() => {
          setExitClass("preview-exit");
        }, itemDelay / 3);
      }
    }
  }, [picked]);

  const msPerLetter = 115;
  const longTextLimit = 27;

  useEffect(() => {
    setEntranceClass("");
    const isLongTLabel = item.title.length >= longTextLimit;
    setTimeout(() => {
      setShowingItem(item);
      setIsLargeText(isLongTLabel);
      setEntranceClass("preview-entrance");
    }, 100);
  }, [item]);

  const scrolling = useSpring({
    from: { transform: "translate(0%,0)" },
    to: { transform: "translate(-100%,0)" },
    config: {
      duration: msPerLetter * item.title.length,
    },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey((prevState) => prevState + 1);
    },
  });

  const onItemClick = () => {
    // setExitClass("preview-exit");
    onMediaPick(showingItem.id, index);
  };

  const optionBackground =
    showingItem.img === "N/A" || !showingItem.img
      ? "rgba(32, 33, 36, 0.99)"
      : `url(${showingItem.img})`;

  const itemAnimation = `${itemDelay}ms`;
  return (
    <li
      className={`search-options-item item-${itemClass} ${entranceClass} ${exitClass} flex align-center space-center`}
      style={{
        transitionDuration: itemAnimation,
      }}
      onClick={onItemClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tilt
        className={`Tilt item-tilt flex align-center space-start`}
        options={{ speed: 500, scale: 1, reverse: true }}
        style={{
          backgroundImage: optionBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-tilt-axis="x"
      >
        <span className="Tilt-inner item-title title-shadow flex align-center space-start">
          {isLargeText && isHovering ? (
            <animated.div className="title-text" style={scrolling}>
              {showingItem.title}
            </animated.div>
          ) : (
            <p className="title-text">{showingItem.title}</p>
          )}
        </span>
      </Tilt>
    </li>
  );
}

export default SearchOptionsItem;
