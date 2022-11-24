import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  uploadImagesMapDispatchToProps,
  uploadImagesMapStateToProps,
} from "../models";
import { Input, makeStyles, Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { updateFormStore, globalUtils } from "../../../utils";
import * as _ from "lodash";
import BackHeader from "../../../components/back-header/BackHeader";
import ImageIcon from "../../../assets/icons/Image";
import CameraAddIcon from "../../../assets/icons/CameraAdd";
import { MuuriComponent, ItemDrag } from "muuri-react";
import { isPlatform } from "@ionic/react";
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { decode } from "base64-arraybuffer";
const { Camera } = Plugins;

const useStyles = makeStyles(() => ({
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "white",
  },
  previewBox: {
    width: 80,
    height: 80,
    border: "2px solid rgba(140, 69, 11, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 auto",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  preview: {
    objectFit: "cover",
    height: 80,
    width: 80,
  },
  container: {
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "center",
    // padding: "60px 10px 10px 10px",
    paddingTop: 20,
    maxWidth: 482,
    width: "100%",
    margin: "0 auto",
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    marginLeft: 2,
  },
  "@media (max-width: 480px)": {
    container: {
      width: 386,
    },
  },
  "@media (max-width: 387px)": {
    container: {
      width: 290,
    },
  },
  cameraButton: {
    marginRight: '10px',
    display: 'flex',
    marginLeft: 'auto'
  }
}));

const UploadImagesComponent = ({ listingForm, setCurrentPage, createNotification }) => {
  const classes = useStyles();

  const [files, setFiles] = useState(_.get(listingForm, "files.value") || []);

  const inputRef = useRef(null);
  const muuriRef = useRef(null);

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    const blob = new Blob([new Uint8Array(decode(image.base64String))], {
      type: `image/${image.format}`,
    });
    const file = new File([blob], "Name", {
      lastModified: new Date(),
      type: blob.type,
    });
    setFiles((currentFiles) => {
      const newFiles = [file, ...currentFiles];
      newFiles.length = 12;
      return newFiles;
    });
  }

  const handleChange = (e) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      _.includes(e.target.files[0].type, "image")
    ) {

      if (e.target.files.length > 12) {
        createNotification({
          message: 'You can add only 12 images', isSuccessful: false
        })
      } else {
        const selectedFiles = e.target.files;

        setFiles((currentFiles) => {
          const newFiles = [...selectedFiles, ...currentFiles];
          newFiles.length = 12;
          return newFiles;
        });
      }
    }
  };

  const handleRemove = (index) => {
    setFiles((currentFiles) => {
      const newFiles = [...currentFiles];
      newFiles[index] = null;
      return newFiles;
    });
  };

  const handleUpload = () => {
    const sortOrder = muuriRef.current
      .getItems()
      .map((item) => item.getElement().getAttribute("id"))
      .filter((item) => item !== null);

    const items = files.map((file, id) => ({ file, id: `${id}` }));

    items.sort(function (a, b) {
      return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id);
    });

    updateFormStore({
      form: "listingForm",
      field: "files",
      value: items.map((item) => item.file),
    });
    setCurrentPage("addListing");
    globalUtils.scrollTo("upload-section", 'auto');
  };

  return (
    <div className={classes.page}>
      <BackHeader
        title="Upload Photo"
        onGoBack={() => setCurrentPage("addListing")}
      />

      <div className={classes.container}>
        {isPlatform('android') &&
          <Button
            onClick={takePhoto}
            variant="outlined"
            color="primary"
            size="small"
            className={classes.cameraButton}
          >open camera </Button>
        }
        <MuuriComponent
          ref={muuriRef}
          dragStartPredicate={(i) => {
            if (i._id === 2) {
              return false;
            }
            return true;
          }}
          dragEnabled
          dragFixed
          dragSortPredicate={(i, e) => {
            if (i._id === 2) return false;
            const result = ItemDrag.defaultSortPredicate(i, {
              action: "swap",
              threshold: 50,
            });
            return result.index === 0 ? false : result;
          }}
          dragSortHeuristics={{
            sortInterval: 0,
          }}
          key="muuri-component"
        >
          <div
            style={{ width: 80, height: 80, margin: 8, zIndex: 5 }}
            key={`1g`}
          >
            <div
              onClick={() => inputRef.current?.click()}
              className={classes.previewBox}
              style={{ position: "relative" }}
            >
              <CameraAddIcon />
            </div>
          </div>
          {files &&
            files.map((file, i) => (
              <div
                style={{ width: 80, height: 80, margin: 8, zIndex: 5 }}
                key={i}
                id={i}
              >
                <div className={classes.previewBox}>
                  {file ? (
                    <>
                      <IconButton
                        onClick={() => handleRemove(i)}
                        className={classes.closeButton}
                        size="small"
                        key={`icon_${i}`}
                      >
                        <CloseIcon style={{ color: "red" }} />
                      </IconButton>
                      {
                        <img
                          className={classes.preview}
                          src={typeof file === "string" ? file : _.get(file, 'name') ? URL.createObjectURL(file) : ''}
                          alt={i}
                          index={i}
                          key={`img_${i}`}
                        />
                      }
                    </>
                  ) : (
                      <ImageIcon key={`test_${i}`} />
                    )}
                </div>
              </div>
            ))}
        </MuuriComponent>
      </div>

      <div className={classes.justifyCenter}>
        <Button
          onClick={handleUpload}
          style={{ margin: "0 auto" }}
          size="large"
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </div>

      <Input
        type="file"
        onChange={handleChange}
        inputRef={inputRef}
        inputProps={{ multiple: true }}
        hidden
      />

    </div>
  );
};

export const UploadImagesPage = connect(
  uploadImagesMapStateToProps,
  uploadImagesMapDispatchToProps
)(UploadImagesComponent);
