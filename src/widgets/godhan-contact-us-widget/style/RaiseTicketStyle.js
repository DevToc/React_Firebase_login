import styled from "styled-components";
export const raiseTicketStyle = styled.div`
  .MuiOutlinedInput-root {
    height: unset;
  }
  .profileFooter {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;

    .feedbackText {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      margin-top: 10px;
      margin-bottom: 28px;
    }

    .footerLink {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      text-decoration-line: underline !important;
      color: #8c450b;
    }
  }
  .tabs-header {
    padding: 10px;
    width: 100%;
    margin-top: 10px;
    .tabs-width {
      background-color: transparent;
      width: 100%;
      max-width: 800px;
      .MuiPaper-root {
        border-radius: 5px;
      }
      .MuiTabs-root {
        height: 42px;
        background: #ffffff;
        border: 2px solid rgba(43, 87, 154, 0.7);
        border-radius: 5px;
        .MuiTabs-fixed {
          border: unset;
          border-bottom: unset;
          .MuiTab-fullWidth {
            white-space: nowrap;
            opacity: unset;
            .MuiTab-wrapper {
              font-family: Dejavu-Sans;
              font-size: 18px;
              color: #001d48;
              font-weight: 500;
            }
          }
          .Mui-selected {
            background: #8c450b;
            border-radius: 5px;
            .MuiTab-wrapper {
              color: white;
            }
          }
        }
      }
    }
  }
  .MuiTabs-fixed {
    border: solid 1px;
    border-bottom: 0px;
    .MuiButtonBase-root {
      border-right: solid gray 1px;
    }
    .makeStyles-Tab-2 {
      border-right: solid gray 1px;
    }
  }
  .title-input-box {
    .MuiInputLabel-outlined {
      margin-top: -6px;
    }
    .MuiInputBase-fullWidth {
      height: 40px;
    }
  }
  .margin-auto {
    margin-top: auto;
    margin-bottom: auto;
  }
  .edit-profile-component {
    padding-top: 10;
    margin: auto;
    display: flex;
    flex-direction: column;
    .profile-header-component {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 0px !important;
      height: 46px;
      box-shadow: 0px 1px 3px rgb(0 0 0 / 25%);
      background: #ffffff;
    }
    .margin-top-arrow-profile {
      margin-top: 2px;
    }
    .profile-body-component {
      margin-top: 0 !important;
      .body-border {
        padding: 10px;
        margin-bottom: 1rem;
      }
      .edit-profile-buttons {
        flex-direction: row;
        display: flex;
        margin-top: 22px;
        margin-bottom: 1rem;
        justify-content: space-around;
        button {
          width: 120px;
        }
        .cancel-button {
          background: #d32323;
          color: white;
        }
      }
    }
    .pointer-cursor {
      padding-top: 2px;
    }
    @media only screen and (max-width: 600px) {
      .margin-top-arrow-profile {
        font-size: 26px;
        padding-bottom: 10px;
      }
    }
    .ticket-type {
      margin-left: auto;
      margin-right: auto;
    }
    .profile-body-component {
      .MuiGrid-root {
        .MuiGrid-item {
          .MuiFormControl-root {
            display: flex;
          }
        }
      }
    }
  }
`;
