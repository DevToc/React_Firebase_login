import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  bidProductsMapDispatchToProps,
  bidProductsMapStateToProps,
} from "../models";
import {
  useTheme,
} from "@material-ui/core";
import _get from "lodash/get";
import { Conversation } from "./ConversationComponent";
import { globalUtils, socketUtils, updateFormStore } from "../../../utils";
import { bidProductsStyle } from "../style";
import BackHeader from "../../../components/back-header/BackHeader";
import ChatCard from "./ChatCard";

const BidPrdouctsComponent = (props) => {
  const {
    conversationList = [],
    userDetails,
    getMessages,
    fetchCurrentConversations,
  } = props;
  const [isConversation, setConversation] = useState(false);
  const [isUnreadTab, setIsUnreadTab] = useState(false);

  const handleChat = async (el) => {
    globalUtils.scrollTo("root", "auto");
    const socket = await socketUtils.createSocketConnection();
    await socketUtils.registerMessageEvent(socket, props);
    updateFormStore({ form: "chatForm", field: "socket", value: socket });
    updateFormStore({
      form: "chatForm",
      field: "currentConversation",
      value: el,
    });
    setConversation(true);
    getMessages({ room: el.room, from: el.from, to: el.to });
    socket.emit("join", { room: el.room, from: el.from, to: el.to });
  };

  useEffect(() => {
    fetchCurrentConversations({
      currentUser: _get(userDetails, "id"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConversationList = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BackHeader
        title="Inbox"
        style={{
          backgroundColor: "rgba(140, 69, 11, 1)",
          color: "white",
          boxShadow: "none",
          paddingBottom: 5,
        }}
      // right={
      //   <IconButton style={{ color: "white", marginRight: 40 }} size="small">
      //     <NotificationIcon />
      //   </IconButton>
      // }
      />
      <div className="top-tabs">
        <div className="tab-container">
          <span
            onClick={() => setIsUnreadTab(false)}
            className={`tab ${!isUnreadTab && "active"}`}
          >
            All Chats
          </span>
          <span
            onClick={() => setIsUnreadTab(true)}
            className={`tab ${isUnreadTab && "active"}`}
          >
            Unread
          </span>
        </div>
      </div>
      <div className="chat-list">
        {conversationList?.length > 0 && isUnreadTab
          ? conversationList
            .filter(
              (item) => item.isUnreadBy === String(_get(userDetails, "id"))
            )
            .map((convers) => (
              <ChatCard
                onClick={() => handleChat(convers)}
                image={convers.image}
                title={convers.productTitle}
                lastMessage={convers.amount}
                name={convers.from === String(_get(userDetails, "id")) ? convers.listedBy : convers.currentUserName}
                date={globalUtils.getFormattedDate(
                  convers.systemUpdateTime,
                  "YYY-MM-DDThh:mm:ss"
                )}
              />
            ))
          : conversationList.map((convers) => (
            <ChatCard
              onClick={() => handleChat(convers)}
              image={convers.image}
              title={convers.productTitle}
              lastMessage={convers.amount}
              name={convers.from === String(_get(userDetails, "id")) ? convers.listedBy : convers.currentUserName}
              date={globalUtils.getFormattedDate(
                convers.systemUpdateTime,
                "YYY-MM-DDThh:mm:ss"
              )}
            />
          ))}
        {(!isUnreadTab && !conversationList) ||
          (conversationList.length === 0 && (
            <h2 style={{ textAlign: "center" }}>Empty Inbox</h2>
          ))}
        {
          isUnreadTab && conversationList.length > 0 && conversationList.filter(
            (item) => item.isUnreadBy === String(_get(userDetails, "id"))
          ).length === 0 && (
            <h2 style={{ textAlign: "center" }}>Empty Inbox</h2>
          )}
      </div>
    </div>
    // <>
    //   <div className="chat-list-header">
    //     <Typography component="h1" variant="h5" className="header-alignment">
    //       <Box fontWeight="bold" component="span">
    //         Your Recent Chats
    //       </Box>
    //     </Typography>
    //     <SyncIcon className="refresh-icon" onClick={handleRefresh} />
    //   </div>
    //   <Divider variant="middle" />

    //   <div className="chat-action-buttons">
    //     <div className="button-container">
    //       <Button
    //         color="primary"
    //         variant="contained"
    //         onClick={handleSelectAll}
    //         size="small"
    //         className="select-button"
    //         disabled={_get(conversationList, "length", 0) === 0}
    //       >
    //         Select All
    //       </Button>
    //       <Button
    //         variant="contained"
    //         onClick={handleDelete}
    //         size="small"
    //         disabled={options.length === 0}
    //         className="delete-button"
    //       >
    //         Delete
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="view-conversations">
    //     {_get(conversationList, "length", 0) > 0 ? (
    //       conversationList.map((el, key) => (
    //         <>
    //           <div className="conversation-wrapper">
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   checked={String(key) === options[key]}
    //                   onChange={handleToggleChange}
    //                   name={key}
    //                   color="primary"
    //                 />
    //               }
    //             />
    //             <Grid
    //               container
    //               justify="center"
    //               className={`${
    //                 el.isUnreadBy === String(_get(userDetails, "id")) &&
    //                 "unread-chat-room"
    //               }`}
    //               alignContent="center"
    //               spacing={1}
    //               style={{
    //                 alignItems: "center",
    //                 cursor: "pointer",
    //                 border: "2px solid lightgray",
    //                 marginRight: "3px",
    //               }}
    //               onClick={() => {
    //                 handleChat(el);
    //               }}
    //             >
    //               <Grid className="img-productname" item lg={6} xs={6} sm={6}>
    //                 {_get(el, "image") ? (
    //                   <img
    //                     className="product-img"
    //                     src={_get(el, "image")}
    //                     color="primary"
    //                     alt={_get(el, "image")}
    //                   />
    //                 ) : (
    //                   <div className="no-image-container">
    //                     <ImageIcon className="image-icon" />
    //                   </div>
    //                 )}{" "}
    //                 <div className="product-name">
    //                   {" "}
    //                   <p> {el.productTitle} </p>{" "}
    //                 </div>{" "}
    //               </Grid>
    //               <Grid item lg={4} xs={4} sm={4} style={{ display: "flex" }}>
    //                 <PermIdentityTwoToneIcon
    //                   className="user-icon"
    //                   style={{ marginTop: "auto", marginBottom: "auto" }}
    //                 />
    //                 <span className="username">
    //                   <p>
    //                     {" "}
    //                     {el.from === String(_get(userDetails, "id"))
    //                       ? el.listedBy
    //                       : el.currentUserName}{" "}
    //                   </p>
    //                 </span>
    //               </Grid>
    //               <Grid item lg={2} xs={2} sm={2}>
    //                 {globalUtils.getFormattedDateForChat(
    //                   _get(el, "systemUpdateTime"),
    //                   new Date()
    //                 )}
    //               </Grid>
    //             </Grid>
    //           </div>
    //           <br />
    //         </>
    //       ))
    //     ) : (
    //       <div className="no-messages-found">
    //         <Badge color="secondary" badgeContent={0} showZero fullWidth>
    //           <MailIcon color="primary" fontSize="large" />
    //         </Badge>
    //       </div>
    //     )}
    //   </div>
    // </>
  );

  return (
    <>
      <StyledConversations theme={useTheme()}>
        {isConversation ? (
          <Conversation setConversation={setConversation} />
        ) : (
            handleConversationList()
          )}
      </StyledConversations>
    </>
  );
};

const StyledConversations = bidProductsStyle;

export const BidProducts = connect(
  bidProductsMapStateToProps,
  bidProductsMapDispatchToProps
)(BidPrdouctsComponent);
