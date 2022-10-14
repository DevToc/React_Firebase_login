import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={21}
      height={19}
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.292 16.208h1.916V8.542h-5.75v7.666h1.917v-5.75h1.917v5.75zm-13.417 0V1.833a.958.958 0 01.958-.958H16.25a.959.959 0 01.958.958v4.792h1.917v9.583h.958v1.917H.917v-1.917h.958zm3.833-7.666v1.916h1.917V8.542H5.708zm0 3.833v1.917h1.917v-1.917H5.708zm0-7.667v1.917h1.917V4.708H5.708z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
