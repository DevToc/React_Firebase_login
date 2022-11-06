import styled from "styled-components";
export const bidProductsStyle = styled.div`
  .top-tabs {
    background-color: rgba(43, 87, 154, 1);
    padding-bottom: 9px;
    position: sticky;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 5;

    .tab-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 250px;
    }

    .tab {
      font-family: Merriweather-Regular;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: white;
      padding: 4px 14px;
      cursor: pointer;
      //color: white;

      &.active {
        background-color: white;
        color: #224214;
        border-radius: 30px;
      }
    }
  }

  .chat-list {
    padding: 10px 20px 30px 20px;
  }

  /* .chat-action-buttons{
  .button-container{
    display: flex;
    margin: 1rem;
    .delete-button{
      background-color: red;
      color: white;
      font-weight: bold;
      &.Mui-disabled{
        background-color: lightgray;
      }
    }
    .select-button{
      margin-right: 1rem;
    }
  }
}
.chat-list-header{
margin-top: 1rem;
}
.header-alignment{
  width: 50%;
  margin-left: auto;
  span{
    text-transform: uppercase;
  }
}
@media only screen and (max-width:600px){
  .header-alignment{
    font-size:20px;
  }
}
.chat-list-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 1rem;
  width: 90%;
}

.unread-chat-room{
  border: 5px solid ${(props) => props.theme.palette.primary.main} !important;
}
.user-icon{
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 50%;
  font-size: 20px;
  color: white;
  margin-right: 1rem;
  margin-top: 6px;
}
.view-conversations{
  grid-column: span 2;
  background-color: white;
  margin-bottom: 1rem;
  .conversation-wrapper{
    display: flex;
    border:2px solid lightgray
    .MuiFormControlLabel-root{
      margin-left: 10px;
      margin-right: 0px;
    }
    .MuiList-root{
      width: 80%
    }
  }
  .MuiListItem-root{
    display: flex;
    justify-content: space-evenly;
    border: 1px solid ${(props) => props.theme.palette.primary.main};
    padding: ${(props) => props.theme.spacing(1, 2)};
    flex-direction: column;
    align-items: flex-start;
  }
}
.MuiGrid-root{
    .profile-row{
        display: flex;
        justify-content: space-evenly;
        border: 1px solid ${(props) => props.theme.palette.primary.main};
        padding: ${(props) => props.theme.spacing(1, 2)};
        margin: ${(props) => props.theme.spacing(1, 1)};
    }
}
.flex-row{
  flex-direction: row;
}
.flex-column{
  flex-direction: column
}
.img-productname{
  display:flex;
}
.product-img{
  height: 3rem;
  width: 3rem;
  object-fit: contain;
}
.no-image-container{  
  padding-left: 5px;
  padding-top: 5px;
  padding-right:10px;
}
.image-icon{
  transform: scale(1.8);
  height: ;
  width: 2rem;
  overflow:hidden;
  object-fit: contain;
}
@media only screen and (max-width:600px){
  .product-name{
  margin:auto;
  width: 51%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.username {
  width:60%;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
}
.product-name p{
  vertical-align: baseline;
}
.conversation-component{
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 3rem;
  .MuiGrid-container{
    margin-bottom: 5px;
  }
  .conversation-header-component{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .conversation-body-component { height: 26rem; } 
}
@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
  .conversation-body-component { height: 26rem; }
}
  .conversation-body-component{
    border: 1px solid ${(props) => props.theme.palette.primary.main};
    height: 30rem;
    position: relative;
    overflow-y:auto;
    .conversation-messages{
      height: 23rem;
      overflow-y: auto;
    }
    @media only screen and (max-width: 768px) {
      .conversation-messages{
      }
    }
    @media only screen and (min-width: 600px) and (max-width: 1023px) {
      .conversation-messages{
        height: 17rem;
      }
    }

  }
  .conversation-compose-component{
    bottom: 0;
    display: flex;
    margin: 1rem;
    position: absolute;
    width: 95%;
    margin-left: 5px;
  }
} */
`;
