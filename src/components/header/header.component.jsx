import React from "react";
// stylesheet
import "./Header.styles.scss";
// SVG
import { ReactComponent as Chevron } from "../../assets/down-chevron.svg";

export const Header = () => {
  const handleClick = e => {
    let pageHeight = window.innerHeight;
    window.scrollTo({ top: pageHeight, behavior: "smooth" });
  };

  return (
    <div className="header">
      <h3>Space Savvy</h3>
      <h1>Discover Space Missions</h1>
      <Chevron className="chevron" onClick={handleClick} />
    </div>
  );
};
