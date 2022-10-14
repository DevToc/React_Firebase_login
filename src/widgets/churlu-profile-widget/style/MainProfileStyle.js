import styled from "styled-components";
export const mainProfileStyle = styled.div`
.left-pane {
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.palette.primary.main};
    padding: ${(props) => `${props.theme.spacing(10)}px`};
    height: 120px;
    ${(props) => props.theme.breakpoints.down("sm")} {
      justify-content: center;
      height: 80px;
    }
  }
  main {
    padding: ${(props) => `${props.theme.spacing(2)}px`};

  }
}
.view-conversations{
  .no-messages-found{
    display: flex;
    justify-content: center;
    .MuiBadge-badge{
      margin-right: 2rem;
      margin-top: 2rem;
      font-size: 3rem;
      height: 3rem;
      width: 3rem;
      border-radius: 5rem;
      color: black;
    }
    .MuiSvgIcon-fontSizeLarge{
      font-size: 10rem;
    }
  }
}
/* img {
  height: 100vh;
  background-size: cover;
} */
}
.right-pane {
  max-height: 100%;
  height: 600px;
  width: 100%;
  overflow-y: auto;
  .action-component{
    .action-footer{
      flex-direction: row;
              display: flex;
              margin-top: 1rem;
              margin-bottom: 1rem;
              .cancel-button{
                  margin-right: 2rem;
              }
    }
  }
  .view-conversations{
    .no-messages-found{
      display: flex;
      justify-content: center;
      .MuiBadge-badge{
        margin-right: 2rem;
        margin-top: 2rem;
        font-size: 3rem;
        height: 3rem;
        width: 3rem;
        border-radius: 5rem;
        color: black;
        background-color: yellow;
      }
      .MuiSvgIcon-fontSizeLarge{
        font-size: 10rem;
      }
    }
  }
  /* img {
    height: 100vh;
    background-size: cover;
  } */
}
.MuiContainer-root{
  margin-bottom: 1rem;
}
@media only screen and (max-width: 600px){
  .MuiBox-root-43 {
    font-weight: bold;
    margin-left: 8px;
  }
}
  .chat-align{
    margin-bottom: 6px;
  }
.MuiTypography-h5{
  margin-top: 1px;
  margin-bottom: 2px;
}
.eLVZzJ .user-icon {
    background-color: #2b579a;
    border-radius: 50%;
    font-size: 18px;
    color: white;
    margin-right: 7px;
    margin-top: 7px;
}

@media only screen and (max-width:600px)
{
  .MuiGrid-grid-xs-6 {
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
    display: flex;
  }
  .eLVZzJ .user-icon {
    font-size: 15px;
    color: white;
    margin-right: 7px;
    margin-top: 4px;
}
}
`;
