import React from "react";
import { icons } from "../assets/IconLibrary/IconLibraryHelper";
import { twJoin, twMerge } from "tailwind-merge";
const Icon = ({ name, fillColor, svgClass, size = 4, withwrapper = true }) => {

  const iconsMap = icons.reduce((map, item) => {
    map[item.name] = item.path;
    return map;
  }, {});

  const loadJsx = () => {
    return (
      <svg viewBox={`-5 -6 24 24`} height={size * 4} width={size * 4} className={twMerge(svgClass)} aria-labelledby="svg-title svg-desc" role="icon" xmlns="http://www.w3.org/2000/svg">
        <title id="svg-title">{name} icon</title>
        <desc id="svg-desc">An icon representing {name}</desc>
        <path d={iconsMap[name]} fill={fillColor} />
      </svg>
    )
  }
  return (
    <>
      {
        withwrapper ? (
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm group-hover:bg-primary-light">
            {loadJsx()}
          </div>
        ) : (
          loadJsx()
        )
      }
    </>
  );
};

export default Icon;