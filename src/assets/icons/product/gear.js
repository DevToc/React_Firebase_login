import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 3v3H2M6 3v6M2 3v6"
        stroke="#001D48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2a1 1 0 11-2 0 1 1 0 012 0v0zM7 2a1 1 0 11-2 0 1 1 0 012 0v0zM3 2a1 1 0 11-2 0 1 1 0 012 0v0zM7 10a1 1 0 11-2 0 1 1 0 012 0v0zM3 10a1 1 0 11-2 0 1 1 0 012 0v0zM10 11a1 1 0 100-2 1 1 0 000 2z"
        stroke="#001D48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
