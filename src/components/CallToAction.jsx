import React from "react";
import image from "../assets/images/call-to-action-image.png";

const CallToAction = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={image} alt="" />
      <div style={{ width: "100%" }}>
        <span
          style={{
            textAlign: "center",
            fontFamily: "Merriweather-Regular",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: 17,
            color: "#001D48",
            display: "block",
          }}
        >
          Worried about your business?
        </span>
        <span
          style={{
            textAlign: "center",
            fontFamily: "Merriweather-Regular",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: 20,
            color: "#001D48",
            display: "block",
          }}
        >
          Try Godhan
        </span>
      </div>
    </div>
  );
};

export default CallToAction;
