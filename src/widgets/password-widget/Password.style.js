import styled from "styled-components";

export const passwordWidgetStyle = styled.div`
.oauth-button{
  margin: auto;
  width: 150px;
  display: flex;
  margin-bottom: 10px;
  border-radius: 5px;
  span {
    font-size: 18px;
    font-family: Lato;
  }
}
.auth-header{
  background-image: url("/assets/images/cattle-header.png");
  background-repeat: no-repeat;
  background-position: left;
  height: 95vh;
  display: flex;
  .auth-wrapper{
    margin: auto;
  }
}
@media only screen and (max-width: 800px){
  .auth-header{
    background-size: 60%;
    height: 100vh;
    background-position: left bottom !important;
    background-image: url("/assets/images/cattle-header-transparent.png");
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
