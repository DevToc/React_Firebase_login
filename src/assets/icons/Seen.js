import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={28}
      height={13}
      viewBox="0 0 28 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.583 6.042l6.563 5 3.281-3M9.084 6.042l6.562 5 10.938-10M19.084 1.042l-4.375 4"
        stroke="#4285AA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
