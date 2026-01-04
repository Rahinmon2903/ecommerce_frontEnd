import React from "react";
import logo from "../assets/dream-it-own-it.png";

const Logo = ({ size = 48, className = "" }) => {
  return (
    <img
      src={logo}
      alt="Dream It. Own It"
      style={{ height: size }}
      className={`w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
};

export default Logo;
