import styled from "styled-components";

export const signupWidgetStyle = styled.div`
  .select-title {
    font-size: 20px;
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
    width: 150px;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    span {
      font-size: 18px;
      font-family: Lato;
      line-height: 24px;
    }
  }
  .select-title-small {
    font-size: 16px;
    margin-top: 10px;
  }
  .login-with-label {
    font-family: Lato;
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
    border-radius: 5px;
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
