import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
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
        d="M16.292 5.75a1.917 1.917 0 100-3.833 1.917 1.917 0 000 3.833zM15.12 10.512a1.923 1.923 0 002.058.795l3.178-.794-.463-1.86-3.178.795-1.321-1.98a1.926 1.926 0 00-1.22-.82l-3.685-.737a1.915 1.915 0 00-2.09 1.023l-1.59 3.177 1.715.858 1.59-3.179 1.884.378-4.874 8.124H2.875v1.916h4.25c.668 0 1.298-.356 1.643-.93l1.838-3.063 4.954.99 1.74 5.223 1.817-.607-1.74-5.22a1.923 1.923 0 00-1.443-1.275l-2.912-.582 1.698-2.831.4.599z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;