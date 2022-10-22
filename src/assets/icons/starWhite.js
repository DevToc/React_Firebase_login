import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.074 1.633c.32-.844 1.531-.844 1.852 0l2.07 5.734a.99.99 0 00.926.633h5.087c.94 0 1.35 1.17.611 1.743L17 13a.969.969 0 00-.322 1.092L18 19.695c.322.9-.72 1.673-1.508 1.119l-4.917-3.12a1 1 0 00-1.15 0l-4.917 3.12c-.787.554-1.83-.22-1.508-1.119l1.322-5.603A.968.968 0 005 13L1.38 9.743C.64 9.17 1.052 8 1.99 8h5.087a.989.989 0 00.926-.633l2.07-5.734h.001z"
        fill="#fff"
        stroke="#224214"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
