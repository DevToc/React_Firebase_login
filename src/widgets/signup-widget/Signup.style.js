import styled from "styled-components";

export const signupWidgetStyle = styled.div`
.button-wrapper{
  width: 70%;
  margin: auto;
}
.oauth-button{
  margin: auto;
  display: flex;
  margin-bottom: 10px;
  border-radius: 25px;
  span {
    font-size: 18px;
    font-family: Dejavu-Sans;
    text-transform: none !important;
    color: #001D48 !important;
  }
}
.MuiOutlinedInput-inputAdornedStart::placeholder {
    color: #344654;
    font-family: Dejavu-Sans;
}
.or-title{
    margin-top: 8px;
}
.auth-header{
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
  }
}
  .select-title {
    font-size: 16px;
    justify-content: center;
    display: flex;
  }
  .MuiFormControl-marginNormal {
    padding-left: 33px;
    padding-right: 32px;
    margin-bottom: 0px;
    display: flex;
  }
  .continue-button {
    margin-top: 25px;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 25px;
    span {
      font-size: 18px;
      font-family: Dejavu-Sans;
      line-height: 24px;
    }
  }
  .select-title-small {
    font-size: 16px;
    margin-top: 10px;
  }
  .login-with-label {
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    letter-spacing: 0.01em;
  }
  .justify-content {
    display: flex;
    justify-content: center;
  }
  .row {
    display: flex;
    justify-content: space-around;
    .oauth-label {
      font-size: 17px;
      font-family: Inter;
      color: #001d48;
      font-weight: 500;
    }
    .oauth-label a {
      font-size: 17px;
      font-family: Inter;
      color: #001d48;
      font-weight: 500;
    }
  }
  .divider-login-with {
    width: 10%;
    margin: 2px auto 5px auto;
  }
  .post-login {
    width: 220px;
  }
  .new-user-label {
    font-size: 18px;
  }
  .righ-arrow {
    color: white !important;
  }
  .MuiInputBase-root {
    border-radius: 25px;
  }
  .MuiOutlinedInput-inputAdornedStart {
    font-size: 17px !important;
    color: black;
    height:46px;
    padding: 0;
  }
  .disabled-view{
    .MuiInputBase-root{
      background-color: #dde6f3;
    }
  }
`;
