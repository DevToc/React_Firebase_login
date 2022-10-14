import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const SocialSharingComponent = ({ url = "", style }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        style={style}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ShareIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FacebookShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <FacebookIcon size={36} />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EmailShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <EmailIcon size={36} />
          </EmailShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookMessengerShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <FacebookMessengerIcon size={36} />
          </FacebookMessengerShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LinkedinShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <LinkedinIcon size={36} />
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PinterestShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <PinterestIcon size={36} />
          </PinterestShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TelegramShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <TelegramIcon size={36} />
          </TelegramShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <TwitterIcon size={36} />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton
            url={url}
            quote={"Find this product only on godhan.com"}
            hashtag="#godhan"
          >
            <WhatsappIcon size={36} />
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(url);
            handleClose();
          }}
        >
          <b>
            copy <FileCopyIcon />
          </b>
        </MenuItem>
      </Menu>
    </>
  );
};
