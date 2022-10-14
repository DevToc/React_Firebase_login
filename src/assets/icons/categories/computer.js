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
        d="M1.875.896h4.792a.958.958 0 01.958.958V15.27a.959.959 0 01-.958.959H1.875a.958.958 0 01-.958-.958V1.854a.958.958 0 01.958-.958zm0 10.541v1.917h1.917v-1.917H1.875zM10.5 3.771h7.667a1.916 1.916 0 011.916 1.916v5.75a1.917 1.917 0 01-1.916 1.917H10.5a1.917 1.917 0 01-1.917-1.917v-5.75A1.917 1.917 0 0110.5 3.771zm1.917 10.541h3.833a.958.958 0 110 1.917h-3.833a.958.958 0 110-1.917z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
