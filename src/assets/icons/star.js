import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.535 1.743c.334-.88 1.595-.88 1.93 0l2.156 5.973c.15.396.535.66.964.66h5.3c.978 0 1.406 1.218.636 1.815l-3.771 3.393a1.008 1.008 0 00-.335 1.137l1.377 5.837c.335.937-.75 1.742-1.571 1.165l-5.122-3.25a1.041 1.041 0 00-1.198 0l-5.122 3.25c-.82.577-1.906-.23-1.57-1.165l1.376-5.837a1.008 1.008 0 00-.335-1.137L1.48 10.19c-.772-.597-.343-1.816.635-1.816h5.299a1.03 1.03 0 00.964-.66l2.156-5.972h.001z"
        stroke={props.stroke || "#fff"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
