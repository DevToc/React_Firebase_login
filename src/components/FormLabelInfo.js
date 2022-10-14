import React, { useState, useRef, useCallback, useEffect } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Fade, Popper } from "@material-ui/core";
import ClickAwayListener from "react-click-away-listener";

const FormLabelInfo = ({ children, style = {} }) => {
  const [open, setOpen] = useState();
  const [isElipsis, setIsElipsis] = useState(false);
  const headingRef = useRef(null);

  const elipsisCheck = useCallback(() => {
    if (!headingRef.current) return;

    const res = headingRef.current.offsetWidth < headingRef.current.scrollWidth;

    setIsElipsis(res);
  }, []);

  useEffect(() => {
    elipsisCheck();
  }, [elipsisCheck]);

  const handleClickAway = () => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 20);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        ...style,
      }}
    >
      <div style={{ width: "85%" }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper
            open={open}
            anchorEl={headingRef.current}
            placement="top"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={300}>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid gray",
                  }}
                >
                  <p
                    style={{ fontSize: 20, marginTop: 0, marginBottom: 0 }}
                    className="formLabel"
                  >
                    {children}
                  </p>
                </div>
              </Fade>
            )}
          </Popper>
        </ClickAwayListener>
        <h5
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          ref={headingRef}
          className="form-label"
        >
          {children}
        </h5>
      </div>
      {isElipsis && <HelpOutlineIcon onClick={() => setOpen((val) => !val)} />}
    </div>
  );
};

export default FormLabelInfo;
