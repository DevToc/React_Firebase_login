import styled from "styled-components";

export const otpWidgetStyle = styled.div`
.oauth-button{
  margin: auto;
  width: 150px;
  display: flex;
  margin-bottom: 10px;
  border-radius: 5px;
  span {
    font-size: 18px;
    font-family: Dejavu-Sans;
    text-transform: none !important;
    color: #001D48 !important;
  }
}
.auth-header{
  //background-image: url("/assets/images/cattle-header.png");
  background-repeat: no-repeat;
  background-position: left;
  height: 95vh;
  display: flex;
  .auth-wrapper{
    margin: auto;
    background: ghostwhite !important;
  }
}
@media only screen and (max-width: 800px){
  .auth-header{
    background-size: 60%;
    height: 100vh;
    background-position: left bottom !important;
    //background-image: url("/assets/images/cattle-header-transparent.png");
  }
  .auth-wrapper{
    padding: 10px;
    height: 80%;
  }
}
@media only screen and (min-width: 800px) {
  .auth-wrapper{
    width: 30%;
    padding: 20px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    background: ghostwhite !important;
  }
}
  .otp-sub-title {
    font-size: 20px;
    font-family: Dejavu-Sans;
    line-height: 24px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .text-align-center{
    text-align: center;
  }
  .MuiFormControl-marginNormal {
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 0px;
    display: flex;
  }
  .otp-container-box{
    .mar-2{
      margin: 5px !important;
    }
  }
  .otp-container {
    background: #ffffff;
    border: 2px solid ${(props) => props.theme.palette.primary.main} !important;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 10px;
    height: 366px;
    max-width: 350px;
    margin-top: 20px;
    width: 100%;
  }
  .margin-subtitle {
    margin-bottom: 8px;
  }
  .otp-input {
    justify-content: center;
    display: flex;
    .MuiInput-root{
      width: 50%;
    }
    input[type="number"] {
      font-size:17px !important;
      text-align: center;
    }
  }
  .resend-otp {
    color: ${(props) => props.theme.palette.primary.main} !important;
    font-size: 20px;
    font-family: Dejavu-Sans;
    line-height: 24px;
  }
  .confirm-button {
    margin-top: 25px;
    width: 70%;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 25px !important;
    span {
      font-size: 18px;
      font-family: Dejavu-Sans;
      line-height: 24px;
    }
  }
  .margin-alignment {
    margin-top: 20px;
  }
  .new-user-label {
    font-size: 18px;
  }
  .post-login {
    margin-top: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .otp-label{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
