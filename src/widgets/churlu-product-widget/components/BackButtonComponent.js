import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { globalUtils } from "../../../utils";

export const BackButtonComponent = ({ style = {}, color }) => {
  let history = useHistory();

  const handleClick = () => {
    try {
      const nextFlow = globalUtils.getSessionStorageItem("godhan-next-flow");
      if (nextFlow) {
        globalUtils.removeSessionStorageItem("godhan-next-flow");
        history.push(nextFlow);
      } else {
        history.goBack();
      }
    } catch (err) {
      history.push("/");
    }
  };

  return (
    <>
      <ArrowBackIcon
        style={style}
        color="black"
        onClick={() => handleClick()}
      />
    </>
  );
};
