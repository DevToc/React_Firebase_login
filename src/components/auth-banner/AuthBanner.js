import React from "react";

export const AuthBanner = (props) => {
  const { title } = props;
  return (
    <>
      <img
        src="/assets/images/cattle-header.png"
        alt="auth-header"
        className="auth-banner"
      />
      <div className="body-section">
        <div className="godhan-title">Godhan</div>
        <h2
          style={{ marginTop: 5, marginBottom: 10 }}
          className="godhan-sub-title"
        >
          {title}
        </h2>
      </div>
    </>
  );
};
