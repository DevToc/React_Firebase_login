import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.8 14.55v-2.517a.767.767 0 00-.767-.766H8.5a.767.767 0 00-.767.766v2.516A6.12 6.12 0 003.2 19.567a.777.777 0 00.767.898H14.58a.78.78 0 00.766-.898A6.12 6.12 0 0010.8 14.55zm7.113-5.922L14.08.96a.767.767 0 00-.686-.428H5.14a.767.767 0 00-.684.423L.622 8.623a.767.767 0 00.68 1.11h12.565v2.3a.767.767 0 001.533 0v-2.3h1.83a.767.767 0 00.683-1.105z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
