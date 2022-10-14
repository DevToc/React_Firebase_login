import * as React from "react";

function SvgComponent({ color = "#001D48", ...props }) {
  return (
    <svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.902 20H17.1c0-.217.15-1.35.45-3.397.3-2.047.45-3.397.45-4.049a.613.613 0 00-.099-.332.849.849 0 00-.323-.28 5.11 5.11 0 00-.45-.216 5.045 5.045 0 00-.633-.204c-.272-.073-.511-.132-.717-.177l-.865-.19c-.37-.082-.673-.15-.907-.204a6.579 6.579 0 01-.71-.312 8.255 8.255 0 00-.443-.218c-.066.082-.127.505-.183 1.27a83.81 83.81 0 01-.239 2.616c-.103.978-.23 1.712-.38 2.201a1.015 1.015 0 01-.407.544c-.207.145-.385.235-.535.271-.15.037-.271.055-.365.055H7.258c-.094 0-.216-.018-.366-.055-.15-.036-.328-.126-.534-.271a1.015 1.015 0 01-.408-.544c-.15-.489-.277-1.223-.38-2.2a83.915 83.915 0 01-.239-2.616c-.056-.766-.117-1.19-.183-1.27-.065.026-.213.099-.443.217a6.59 6.59 0 01-.71.312c-.234.054-.536.122-.907.204l-.864.19c-.207.045-.446.104-.717.177-.272.072-.483.14-.633.204-.15.063-.3.135-.45.217a.849.849 0 00-.324.279.614.614 0 00-.098.332c0 .652.15 2.002.45 4.05.3 2.046.45 3.179.45 3.396zm8.1-9.13L11.7 10v2.609l-2.7-.87-2.7.87V10l2.7.87zm0 3.043a.448.448 0 01-.31-.129.402.402 0 010-.611.448.448 0 01.31-.13c.112 0 .215.043.309.13a.402.402 0 010 .611.448.448 0 01-.31.129zm0 1.74a.448.448 0 01-.31-.13.402.402 0 010-.611.448.448 0 01.31-.13c.112 0 .215.044.309.13a.402.402 0 010 .611.448.448 0 01-.31.13zm2.446-6.794c.975.715 1.884 1 2.728.856a1.548 1.548 0 01-.802-1.155c.15.19.368.312.654.367.286.054.565.036.837-.055-.46-.39-.764-.792-.914-1.209-.15-.417-.263-.987-.338-1.712a24.326 24.326 0 01-.077-1.691c-.014-.73-.059-1.298-.134-1.706a2.586 2.586 0 00-.45-1.073c-.28-.39-.862-.734-1.743-1.033C10.328.15 9.592 0 9 0c-.815 0-1.673.195-2.573.584-.9.39-1.467.92-1.701 1.59-.066.19-.12.589-.162 1.196a47.453 47.453 0 00-.092 1.813l-.028.945c-.168 1.603-.515 2.6-1.04 2.989.131.081.337.084.619.007.28-.077.524-.193.73-.347-.009.272-.22.634-.632 1.087.253.045.673-.04 1.258-.258.586-.217 1.039-.426 1.357-.625.703.39 1.458.584 2.264.584.89 0 1.706-.235 2.447-.706zM6.175 7.704c-.084-.544-.028-1.468.169-2.772.196-1.304.487-2.047.871-2.228.066-.027.188.03.366.17s.277.26.295.36c.057.29 0 .57-.168.842.178.154.522.25 1.033.285.511.037.975.039 1.392.007a7.87 7.87 0 00.95-.115c.112.117.217.244.316.38.098.136.18.288.246.455.065.168.122.313.168.435.047.122.092.29.134.503.042.213.07.362.084.448.014.086.036.24.064.462.028.222.047.351.056.387-.356.49-.81.877-1.364 1.162a3.839 3.839 0 01-1.786.428c-1.125 0-2.067-.403-2.826-1.21z"
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
