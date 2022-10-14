import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.5 6.114a.625.625 0 00.393.591l6 2.4 2.401 6.002a.625.625 0 00.581.393h.01a.624.624 0 00.578-.411l5-13.75a.624.624 0 00-.802-.802l-13.75 5a.626.626 0 00-.411.578z"
        fill="#344654"
      />
    </svg>
  );
}

export default SvgComponent;
