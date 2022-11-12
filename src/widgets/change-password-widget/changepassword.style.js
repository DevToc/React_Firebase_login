import styled from 'styled-components'

export const changePasswordWidgetStyle = styled.div`
.oauth-button{
    margin: auto;
    width: 150px;
    display: flex;
    margin-bottom: 10px;
    border-radius: 25px;
    span {
      font-size: 18px;
      font-family: Dejavu-Sans;
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
    }
  }
  .MuiInputBase-root {
    border-radius: 25px;
  }
.change-password-body{
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15%;
    .change-password-button{
        margin-top: 25px;
        width: 70%;
        height: 45px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        border-radius: 25px;
        span{
            font-size: 18px;
            font-family: Dejavu-Sans;
            line-height: 24px;
        }
    }
    .MuiFormControl-marginNormal{
        width: 100%;
        .MuiInputBase-root{
            margin-bottom: 10px;
        }
    }
}
`