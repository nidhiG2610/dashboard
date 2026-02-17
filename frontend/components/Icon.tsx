import React, { type JSX, type ReactNode } from "react";
import { icons } from  "../assets/IconLibrary/IconLibraryHelper";
import { twJoin, twMerge } from "tailwind-merge";

interface IconProps {
  name: string;
  fillColor?: string;
  svgClass?: string;
  size?: number;
  withwrapper?: boolean;
}

const Icon = ({ name, fillColor = "#14171A", svgClass, size = 4, withwrapper = true }: IconProps): JSX.Element => {

  const iconsMap : Record<string, string> = icons.reduce((map : Record<string, string>, item) => {
    map[item.name] = item.path;
    return map;
  }, {});

  const loadSvgElement = () : ReactNode => {
    return (
      <svg viewBox={`-5 -6 24 24`} height={size * 4} width={size * 4} className={twMerge(svgClass)} aria-labelledby="svg-title svg-desc" role="icon" xmlns="http://www.w3.org/2000/svg">
        <title id="svg-title">{name} icon</title>
        <desc id="svg-desc">An icon representing {name}</desc>
        <path d={iconsMap[name]} fill={fillColor} />
      </svg>
    );
  };

  return (
    <>
      {
        withwrapper ? (
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm group-hover:bg-primary-light">
            { loadSvgElement() }
          </div>
        ) : (
          loadSvgElement()
        )
      }
    </>
  );
};

export default Icon;