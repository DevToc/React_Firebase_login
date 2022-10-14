import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.81 7.9l2.83 2.83c.78.77 2.05.77 2.83 0l1.41-1.41 4.55 4.55-2.83 2.82 1.4 1.42c5 4.95 8.5 1.39 8.5 1.39S23 16 18.09 11l-1.41-1.41-2.8 2.8-4.54-4.54 1.39-1.39c.77-.78.77-2.05 0-2.83L7.9.8.81 7.9zm8.47-2.83L7.9 6.45 6.46 7.89l-1.4 1.4-1.41-1.41 4.23-4.23 1.4 1.42z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
