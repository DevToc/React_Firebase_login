import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  conversationMapDispatchToProps,
  conversationMapStateToProps,
} from "../models";
import {
  IconButton,
} from "@material-ui/core";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import {
  updateFormStore,
  globalUtils,
  socketUtils,
} from "../../../utils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BackHeader from "../../../components/back-header/BackHeader";
import PersonIcon from "@material-ui/icons/Person";
import Message from "./Message";
import SendIcon from "@material-ui/icons/SendOutlined";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  page: {
    padding: "10px 6px",
    backgroundColor: "#E5E5E5",
    height: "100vh",
  },
  headerUser: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  inputContainer: {
    position: "fixed",
    marginBottom: '10px',
    width: "100%",
    display: "flex",
    // alignItems: "center",
    paddingRight: 12,
  },
  inputWrapper: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  input: {
    backgroundColor: "white",
    fontSize: 17,
    padding: "13px 0px 13px 20px",
    border: 0,
    outline: 0,
    width: "100%",
  },
  sendButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(140, 69, 11, 1)",
    color: "white",
    width: 45,
    height: 45,
    marginLeft: 12,
    borderRadius: "50%",
  },
  messageSection: {
    height: '80%',
    overflow: 'auto',
    // marginTop: '-10px'
  }
}));

const ConversationComponent = ({
  setConversation,
  currentConversation = {},
  userDetails,
  messageList,
  chatForm,
  socket,
  fetchCurrentConversations,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const bottomDivRef = useRef();

  const {
    from = "",
    room = "",
    to = "",
    currentUserName,
    listedBy,
  } = currentConversation;
  const handleBackIcon = () => {
    socketUtils.disconnectChat(socket);
    setConversation(false);
    fetchCurrentConversations({
      currentUser: _get(userDetails, "id"),
    });
    updateFormStore({
      form: "chatForm",
      field: "currentConversation",
      value: {},
    });
    updateFormStore({ form: "chatForm", field: "currentMessage", value: "" });
  };

  useEffect(() => {
    if (document.getElementById("message-list") && !_isEmpty(messageList)) {
      var objDiv = document.getElementById("message-list");
      objDiv.scrollTop = objDiv.scrollHeight;

    }
  }, [messageList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormStore({ form: "chatForm", field: name, value });
  };


  const handleClick = async () => {
    if (_get(chatForm, "currentMessage.value")) {
      await socket.emit(
        "sendMessage",
        { url: _get(chatForm, "currentMessage.value") },
        {
          from: String(_get(userDetails, "id")),
          to: String(_get(userDetails, "id")) === String(from) ? to : from,
          room,
        },
        () => {
          console.log("message sent");
        }
      );
      updateFormStore({ form: "chatForm", field: "currentMessage", value: "" });
    }
  };

  const handleEnter = (e) => {
    const { key } = e;
    if (key === "Enter") {
      handleClick();
    }
  };

  const [titleFirst = "", titleSecond = ""] =
    currentConversation.productTitle.split(" ");

  const handleProfileClick = () => {
    const val = currentConversation.room.split("_");
    const productId = val.find((ele) => ele !== from && ele !== to);
    const userId = currentConversation.from === String(_get(userDetails, "id")) ? currentConversation.to : currentConversation.from
    history.push(`profile?id=${productId}&userId=${userId}`)
  }
  return (
    <>
      <BackHeader
        title={`${titleFirst} ${titleSecond}`}
        onGoBack={handleBackIcon}
        style={{
          backgroundColor: "rgba(140, 69, 11, 1)",
          color: "white",
        }}
        right={
          <div
            onClick={handleProfileClick}
            // to={`profile?id=123`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <PersonIcon />
            <span className={classes.headerUser}>
              {currentConversation.from === String(_get(userDetails, "id"))
                ? listedBy
                : currentUserName}
            </span>
          </div>
        }
      />
      <div className={classes.page}>
        <div className={classes.messageSection} id="message-list">
          {!_isEmpty(messageList) &&
            _get(messageList, "length") > 0 &&
            messageList.map((message, i) => {
              return (
                <Message
                  key={message._id || Date.now().toString()}
                  message={message.message}
                  date={globalUtils.getFormattedDateForChat(
                    _get(message, "createdDate"),
                    new Date()
                  )}
                  personal={
                    _get(message, "from") === String(_get(userDetails, "id"))
                  }
                />
              );
            })}
        </div>
        <div className={`${classes.inputContainer} footer`}>
          <div className={classes.inputWrapper}>
            <input
              name={_get(chatForm, `currentMessage.name`)}
              placeholder={"Write a reply..."}
              value={_get(chatForm, `currentMessage.value`)}
              onChange={handleChange}
              type="text"
              className={classes.input}
              onKeyPress={handleEnter}
            />
          </div>

          <IconButton
            style={{
              backgroundColor: "rgba(140, 69, 11, 1)",
              color: "white",
              marginLeft: 12,
            }}
            onClick={handleClick}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
      <div ref={bottomDivRef} />
    </>
    // <>
    //   <div className="conversation-component">
    //     <div className={classes.arrowSection}>
    //       <ArrowBackIcon
    //         color="primary"
    //         className="pointer-cursor arrow-alignment margin-top-arrow-profile"
    //         onClick={handleBackIcon}
    //         style={{ marginRight: "1rem" }}
    //       />
    //       <Typography component="h1" variant="h5">
    //         <Box component="span" color="primary">
    //           Back to inbox
    //         </Box>
    //       </Typography>
    //     </div>
    //     <Grid container>
    //       <Grid item xs={12} sm={12} md={6} lg={6}>
    //         <Link to={`product/${room.split("_")[2]}`}>
    //           <Typography component="h1" variant="h5">
    //             <Box fontWeight="bold" component="span">
    //               {_get(currentConversation, "productTitle")}
    //             </Box>
    //           </Typography>
    //         </Link>
    //       </Grid>
    //       <Grid item xs={12} sm={12} md={6} lg={6} className={classes.chatName}>
    //         <PermIdentityTwoToneIcon className="user-icon" />
    //         <Link to={`product/${room.split("_")[2]}`}>
    //           <Typography component="h1" variant="h6">
    //             <Box fontWeight="bold" component="span">
    //               {currentConversation.from === String(_get(userDetails, "id"))
    //                 ? listedBy
    //                 : currentUserName}
    //             </Box>
    //           </Typography>
    //         </Link>
    //         {/* </div> */}
    //       </Grid>
    //     </Grid>
    //     <div className="conversation-body-component">
    //       <div className="conversation-messages" id="conversation-messages">
    //         {!_isEmpty(messageList) &&
    //           _get(messageList, "length") > 0 &&
    //           messageList.map((message, i) => (
    //             <>
    //               <div
    //                 className={`${classes.bubbleContainer} ${
    //                   _get(message, "from") === String(_get(userDetails, "id"))
    //                     ? classes.right
    //                     : classes.left
    //                 }`}
    //               >
    //                 <div
    //                   key={i++}
    //                   className={`${classes.bubble} ${
    //                     _get(message, "from") ===
    //                     String(_get(userDetails, "id"))
    //                       ? classes.rightBubble
    //                       : classes.leftBubble
    //                   }`}
    //                 >
    //                   <div className={classes.button}>
    //                     <Typography component="div" variant="div">
    //                       {message.message}
    //                     </Typography>
    //                     <span className={classes.timestamp}>
    //                       {globalUtils.getFormattedDateForChat(
    //                         _get(message, "createdDate"),
    //                         new Date()
    //                       )}
    //                       {_get(message, "from") !==
    //                         String(_get(userDetails, "id")) && (
    //                         <>
    //                           &nbsp; from{" "}
    //                           {_get(currentConversation, "from") ===
    //                           String(_get(userDetails, "id"))
    //                             ? _get(currentConversation, "listedBy")
    //                             : _get(currentConversation, "currentUserName")}
    //                         </>
    //                       )}
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </>
    //           ))}
    //       </div>
    //       <div className="conversation-compose-component">
    //         <TextField
    //           name={_get(chatForm, `currentMessage.name`)}
    //           label={_get(chatForm, `currentMessage.placeholder`)}
    //           variant="outlined"
    //           color="primary"
    //           fullWidth
    //           autoFocus
    //           multiline
    //           rowsMax={1}
    //           margin="normal"
    //           value={_get(chatForm, `currentMessage.value`)}
    //           defaultValue={_get(chatForm, `currentMessage.value`)}
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           error={!_get(chatForm, `currentMessage.isValid`)}
    //           helperText={
    //             !_get(chatForm, `currentMessage.isValid`) &&
    //             _get(chatForm, `currentMessage.errorText`)
    //           }
    //           onKeyPress={handleEnter}
    //         />

    //         <IconButton
    //           variant="outlined"
    //           color="primary"
    //           fullWidth
    //           onClick={handleClick}
    //         >
    //           <SendIcon />
    //         </IconButton>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export const Conversation = connect(
  conversationMapStateToProps,
  conversationMapDispatchToProps
)(ConversationComponent);
