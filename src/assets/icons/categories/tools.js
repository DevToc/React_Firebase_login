import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={21}
      height={17}
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.458 7.542a.958.958 0 110 1.916.958.958 0 010-1.916zM6.533 2.99A6.706 6.706 0 0111.458.833c3.354 0 6.172 2.502 6.642 5.75h1.983V8.5h-5.75a2.875 2.875 0 10-5.75 0H.917V6.583h.048A10.518 10.518 0 013.313.833l3.22 2.157zM5.45 4.56l-1.6-1.073a8.288 8.288 0 00-.96 3.095h1.927c.106-.719.316-1.399.633-2.022zm.642 7.197L4.75 10.417h5.549c.23.402.68.67 1.16.67.479 0 .929-.268 1.159-.67h5.549v1.341c-1.543-.939-1.476.336-1.476.336v1.878l-1.878 1.878c-.48-1.677-1.342-.738-1.342-.738l-1.342 1.342H9.446c.939-1.543-.336-1.476-.336-1.476H7.232L5.354 13.1c1.677-.47.738-1.342.738-1.342z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
