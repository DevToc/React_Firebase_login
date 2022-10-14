import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={20}
      height={19}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.75 12.5H4.262c-.137 0-.25.128-.25.285l-.003 1.704c0 .156.113.284.25.284H15.75c.137 0 .25-.127.25-.284v-1.704c0-.157-.113-.284-.25-.284zm0 3.41H4.253c-.137 0-.25.128-.25.284L4 17.898c0 .157.112.284.25.284h11.5c.137 0 .25-.127.25-.284v-1.704c0-.156-.113-.284-.25-.284zm0-6.819H4.269c-.138 0-.25.128-.25.285l-.003 1.704c0 .156.112.284.25.284H15.75c.137 0 .25-.128.25-.284V9.376c0-.157-.113-.285-.25-.285zm3.328-4.936L10.575.132a1.35 1.35 0 00-1.153 0l-8.5 4.023C.366 4.422 0 5.04 0 5.73v12.17c0 .156.113.283.25.283h2.5c.138 0 .25-.127.25-.284V9.091c0-.625.456-1.136 1.019-1.136H15.98c.563 0 1.019.511 1.019 1.136v8.807c0 .157.113.284.25.284h2.5c.137 0 .25-.127.25-.284V5.728c0-.688-.366-1.306-.922-1.573z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
