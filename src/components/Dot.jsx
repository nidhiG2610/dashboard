import React from "react";
import { icons } from "../assets/IconLibrary/IconLibraryHelper";
import { twJoin, twMerge } from "tailwind-merge";
const Dot = ({ name, color, svgClass, size = 4, shouldPulse = true }) => {

  return (
    <>
      <span className={twMerge(`absolute h-2.5 w-2.5 rounded-full ring-2 ring-white ${shouldPulse ? 'animate-pulse' : ''}`, color)}></span>
    </>
  );
};

export default Dot;