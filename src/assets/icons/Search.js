import * as React from "react";

function SvgComponent({ width = 23, height = 23, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.011 18.58a8.572 8.572 0 100-17.143 8.572 8.572 0 000 17.143zM16.44 16.438l5 5"
        stroke="#001D48"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
