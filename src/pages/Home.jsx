import React, { useEffect, useState } from "react";

import { ReactComponent as IconTv } from "../assets/img/tv.svg";
import { ReactComponent as IconFilm } from "../assets/img/film.svg";

const Home = (props) => {
  const { theme } = props;

  const [headerTitleClass, setHeaderTitleClass] = useState("enter-title");
  const [contentClass, setContentClass] = useState("");

  useEffect(() => {
    setTimeout(() => {
        setHeaderTitleClass("");
      setTimeout(() => {
        setHeaderTitleClass("exit-title");
        setTimeout(() => {
            setContentClass("new-header-position");
        }, 300);
      }, 3000);
    }, 500);
  }, []);

  console.log(theme);
  return (
    <main
      className={`home-main main-${theme} flex column align-end space-start`}
    >
      <section className="home-content flex column align-center space-center">
        <div
          className={`home-header flex column align-center space-center ${contentClass}`}
        >
          <p className={headerTitleClass}>Welcome to </p>
          <p>GRAFIT.</p>
        </div>
        <p>
          A design driven, go-to tool for researching and analyzing your
          favorite Movies & TV Shows, all using cutting edge tech like React,
          SASS, Redux alongside beautiful, self-built components!
        </p>
        <div className={`home-images main-images-${theme} flex align-center space-between`}>
          <IconTv className="type-icon" />
          <IconFilm className="type-icon" />
        </div>
        <p>
          Explore the bigger picture of any movie you can think of, with a rare
          insight you've never seen before.
        </p>
      </section>
    </main>
  );
};

export default Home;
