import styled from "styled-components";

export const passwordWidgetStyle = styled.div`
  .select-title {
    font-size: 20px;
    justify-content: center;
    display: flex;
    margin-top: 43px;
    text-align: center;
    font-family: Ubuntu;
  }
  .title-font {
    font-size: 20px;
    font-family: Ubuntu;
  }
  .MuiFormControl-marginNormal {
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 0px;
    display: flex;
    .MuiInputBase-root {
      border-radius: 5px;
    }
  }
  .forgot-link {
    padding-right: 30px;
    padding-top: 5px;
    font-size: 15px;
  }
  .login-button {
    margin-top: 25px;
    width: 150px;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    span {
      font-size: 20px;
      font-family: Lato;
      line-height: 24px;
    }
  }
  .new-user-label {
    margin-top: 30%;
    font-size: 18px;
    font-family: Lato;
  }
  .MuiOutlinedInput-inputAdornedStart {
    font-size: 17px !important;
    color: black;
    height:46px;
    padding: 0;
  }
`;
