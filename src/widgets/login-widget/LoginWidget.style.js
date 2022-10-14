import styled from "styled-components";

export const loginWidgetStyle = styled.div`
  .select-title {
    font-size: 20px;
    justify-content: center;
    display: flex;
    margin-bottom: 6px;
    font-family: Ubuntu;
    letter-spacing: 0.01em;
    font-weight: normal;
    line-height: 23px;
  }
  .or-title{
    margin-top: 8px;
  }
  .MuiFormControl-marginNormal {
    padding-left: 33px;
    padding-right: 32px;
    margin-bottom: 0px;
    display: flex;
  }
  .continue-button {
    margin-top: 34px;
    width: 150px;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    span {
      font-size: 18px;
      font-family: Lato;
      line-height: 24px;
    }
  }
  .select-title-small {
    font-size: 16px;
    margin-top: 10px;
    line-height: 18px;
    color: #001D48;
  }
  .login-with-label {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    color: #001d48;
    line-height: 20px;
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
      font-weight: 500;
      font-size: 17px;
      font-family: Inter;
      color: #001d48;
    }
    .oauth-label a {
      font-weight: 500;
      font-size: 17px;
      font-family: Inter;
      color: #001d48;
    }
  }
  .divider-login-with {
    width: 50px;
    margin: 4px auto;
  }
  .post-login {
    width: 220px;
  }
  .new-user-label {
    font-size: 18px;
    color: #001d48;
    font-family: Ubuntu;
    margin-top: 11px;
  }
  .righ-arrow {
    color: white !important;
  }
  .MuiInputBase-root {
    border-radius: 5px;
  }
  .MuiOutlinedInput-inputAdornedStart {
    font-size: 17px;
    color: black;
    font-family: Lato;
    height:46px;
    padding: 0;
  }
  .MuiOutlinedInput-inputAdornedStart::placeholder {
    color: #344654;
    font-family: Lato;
  }
  .MuiTextField-root .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 2px solid rgba(43, 87, 154, 0.7);
  }
  .disabled-view{
    .MuiInputBase-root{
      background-color: #dde6f3;
    }
  }
`;
