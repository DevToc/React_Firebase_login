import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={24}
      height={23}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.945 17.385c-2.073 0-4.179-1.23-5.408-2.86-5.896 0-6.075 8.425-6.075 8.425h22.965s.462-8.461-6.169-8.461c-1.227 1.648-3.24 2.896-5.313 2.896zM16.884 7.287c0 2.424-2.212 7.058-4.943 7.058C9.214 14.345 7 9.709 7 7.287c0-2.422 2.212-4.389 4.94-4.389 2.731.002 4.943 1.968 4.943 4.389z"
        fill="#001D48"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.09 5.195c0-.454-.633-.82-1.418-.823v-.936c0-.14.053-3.404-5.714-3.404-5.764 0-5.711 3.264-5.711 3.404v.969c-.014 0-.026-.005-.039-.005-.78 0-1.409.361-1.409.808v3.959c0 .444.63.806 1.41.806.778 0 1.41-.362 1.41-.806V5.208c0-.062-.038-.118-.061-.175v-1.08c0-.099-.414-2.563 4.4-2.563 4.816 0 4.315 2.464 4.315 2.563V5.09c-.008.036-.035.068-.035.105v4.05c0 .455.636.825 1.426.825.017 0 .03-.006.047-.006v1.48h-1.414v1.394h2.807l-.014-7.743z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
