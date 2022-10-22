import React from "react";
import { makeStyles } from "@material-ui/core";
import { globalUtils } from "../../../utils";
import _ from 'lodash'
import { isPlatform } from "@ionic/react";

const useStyles = makeStyles({
  box: {
    border: "2px solid #224214",
    borderRadius: 5,
    width: "100%",
    padding: 10,
    position: "relative",
    minHeight: 55,
    display: "flex",
    alignItems: "center",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  button: {
    border: "2px solid #224214",
    borderRadius: 5,
    padding: "3px 13px",
    fontWeight: 600,
    fontSize: 14,
    color: "#344654",
    cursor: "pointer",
    whiteSpace: "nowrap",
    alignSelf: "flex-start",
  },
  preview: {
    width: 70,
    height: 70,
    objectFit: "cover",
    marginLeft: 15,
  },
});

const UploadImagesComponent = ({ images, onClickButton }) => {
  const classes = useStyles();

  const presentImages = images?.filter((image) => image !== null);

  const handleClick = () => {
    globalUtils.scrollTo("root");
    onClickButton();
  };

  return (
    <div className={classes.box}>
      <div
        style={
          presentImages?.length <= 1
            ? { position: "absolute", left: "calc(50% - 61px)" }
            : {}
        }
        onClick={handleClick}
        className={classes.button}
      >
        {presentImages?.length > 0 ? 'Change Photo' : 'Upload Photo'}
      </div>
      {presentImages && isPlatform('ios') &&
        presentImages.map((image, i) => image && (
          <img
            key={i}
            style={{ marginLeft: presentImages.length <= 1 ? "auto" : 15 }}
            src={typeof image === "string" ? image : _.get(image, 'name') ? URL.createObjectURL(image) : ''}
            className={classes.preview}
            alt="upload"
          />
        ))}

      {presentImages && isPlatform('android') &&
        presentImages.map((image, i) => image && (
          <img
            key={i}
            style={{ marginLeft: presentImages.length <= 1 ? "auto" : 15 }}
            src={typeof image === "string" ? image : _.get(image, 'name') ? URL.createObjectURL(image) : ''}
            className={classes.preview}
            alt="upload"
          />
        ))}
    </div>
  );
};

export { UploadImagesComponent };
