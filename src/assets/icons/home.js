import * as React from "react";

function SvgComponent(props) {
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
        d="M20.649 10.845L11.274.428c-.395-.44-1.153-.44-1.548 0L.351 10.845a1.04 1.04 0 00-.177 1.12c.167.377.54.619.951.619h2.083v7.291a1.042 1.042 0 001.042 1.042h3.125a1.042 1.042 0 001.042-1.042V15.71h4.166v4.166a1.042 1.042 0 001.042 1.042h3.125a1.042 1.042 0 001.042-1.042v-7.291h2.083a1.04 1.04 0 00.774-1.739z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgComponent;
