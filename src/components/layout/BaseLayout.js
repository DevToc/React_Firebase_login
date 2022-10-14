import React from "react";
import { ErrorBoundary } from "../index";
import { BottomNav } from "../";

export const BaseLayout = ({ children, isAuthorized, isKeyboardOpened = false }) => {
    return children ? (
      <ErrorBoundary>
        {children}
        {!isKeyboardOpened && (<BottomNav isAuthorized={isAuthorized} />)}
      </ErrorBoundary>
    ) : null;
  };
