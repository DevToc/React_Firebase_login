import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={45}
      height={45}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M37.5 9.375h-5.944l-3.431-3.75h-11.25l-3.431 3.75H7.5a3.761 3.761 0 00-3.75 3.75v22.5a3.761 3.761 0 003.75 3.75h30a3.761 3.761 0 003.75-3.75v-22.5a3.761 3.761 0 00-3.75-3.75zm0 26.25h-30v-22.5h7.594l3.431-3.75h7.95l3.431 3.75H37.5v22.5z"
        fill="#001D48"
      />
      <path
        d="M21.094 30l-4.219-5.625-5.625 7.5h22.5L26.719 22.5 21.094 30z"
        fill="#001D48"
      />
    </svg>
  );
}

export default SvgComponent;
