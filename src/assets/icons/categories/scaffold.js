import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={13}
      height={22}
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.105 2.027l-.496 1.851-3.703-.992.496-1.851L5.551.539.342 19.979l1.851.495.497-1.851 3.702.992-.496 1.851 1.852.496 5.208-19.439-1.851-.496zm-.992 3.703l-.744 2.777-3.703-.992.744-2.777 3.703.992zm-1.24 4.628l-.744 2.777-3.703-.992.744-2.777 3.703.992zm-5.687 6.413l.744-2.777 3.702.992-.744 2.778-3.702-.993z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
