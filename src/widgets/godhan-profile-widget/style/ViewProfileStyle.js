import styled from "styled-components";
export const viewProfileStyle = styled.div`
input[name="mobileNumberPrefix"] {
  margin-left: 0px;
}
  .MuiInputBase-root{
    color: #344654;
    width: 100%;
    border: 0;
    outline: 0;
    font-size: 19px;
    background-color: white;  
    input{
      font-size: 19px;
    }
    input::placeholder{
      font-size: 17px;
    }
  }
  .profileHeader {
    height: 210px;
    background: rgba(140, 69, 11, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 42px;
  }

  .avatarContainer {
    margin-top: 10px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .infoHeading {
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px !important;
    color: #000000;
    margin-bottom: 7px;
    max-width: 600px;
    width: 100%;
  }

  .profile {
    position: relative;
    overflow-x: hidden;
    .navigation {
      position: absolute;
      top: 0;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .backIcon {
        height: 19px !important;
        color: white !important;
      }

      .backText {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        color: white;
        margin-left: -6px;
      }

      .logout {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        text-decoration: underline !important;
        color: white;
      }
    }
  }

  .avatar {
    width: 80px;
    height: 80px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .userName {
    text-align: center;
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #f5f5f5;
    margin-top: 5px;
  }

  .personalInfo {
    padding: 0 10px;

    h2 {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: normal;
      color: #000000;
      max-width: 600px;
      width: 100%;
    }

    .infoContainer {
      display: flex;
      justify-content: space-between;
      max-width: 600px;
      width: 100%;
    }

    .infoLabel {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: 600 !important;
      font-size: 14px;
      color: #344654;
      white-space: nowrap;
    }

    .infoValue {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #000000;
      word-break: break-word;
    }
  }

  .profileFooter {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25%;
    width: 100%;

    .feedbackText {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      margin-top: 10px;
      margin-bottom: 28px;
    }
  }
  .footerLink {
      font-family: Dejavu-Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      text-decoration-line: underline !important;
      color: #8c450b;
    }
    .footer-link-wrapper{
      flex-direction: row;
    }
    @media only screen and (max-width: 340px) {
      .footerLink{
          text-align: center;
        }
      .footer-link-wrapper{
        flex-direction: column;
      }
    }
  }

  .edit-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 33px 20px 33px;
    // max-width: 600px;
    width: 100%;

    .input-edit-button {
      font-size: 18px;
      color: #8c450b;
      text-decoration: underline;
      margin-right: 15px;
    }
  }

  .edit-profile-otp-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }

  .heading-label {
    color: #001d48 !important;
    margin: 0;
    margin-bottom: 10px;
  }

  .divider {
    background-color: #344654;
    height: 2px;
    width: 100%;
  }

  .contactButton {
    padding: 0 6px 0 9px;
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #8c450b;
    background-color: transparent;
    border: 2px solid #8c450b;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .deleteModal {
    background-color: white;
    border: 2px solid #8c450b;
    border-radius: 5px;
    position: fixed;
    top: calc(50% - 125px);
    margin: 10px;
  }

  .deleteModalText {
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px !important;
    line-height: 29px;
    color: #000000;
    text-align: center;
  }

  .space-evenly {
    display: flex;
    justify-content: space-around;
    padding: 20px;
  }
  @media only screen and (max-width: 300px) {
    .deleteModal{
        width: 95%;
      }
      .deleteModalText{
        font-size: 14px !important;
      }
    }
  }
 
@media only screen and (max-width: 300px) {
  .edit-profile{
    .MuiInputBase-root{
      font-size: 14px;
    }
    .MuiFormHelperText-root{
      font-size: 10px !important;
      margin-left: 0px !important;
      margin-right: 0px !important;
    }
    .MuiInputAdornment-root{
      margin-left: 0px !important;
      .MuiSvgIcon-root{
        font-size: 16px; 
      }
    }
    input::placeholder{
      font-size: 12px; !important;
    }
  }
}
.user-info-container{
display: flex;
justify-content: flex-start;
}
.form-label{
  padding-top: 0px !important;
}
`;
