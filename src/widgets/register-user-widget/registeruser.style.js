import styled from 'styled-components'

export const registerWidgetStyle = styled.div`
.oauth-button{
    margin: auto;
    width: 150px;
    display: flex;
    margin-bottom: 10px;
    border-radius: 5px;
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
.select-title{
    font-size: 16px;
    justify-content: center;
    display: flex;
    margin-top: 10px; 
}
.MuiFormControl-marginNormal{
    width: 100%;
    .MuiOutlinedInput-adornedStart{
        .MuiInputAdornment-root{
            svg{
                margin-left: -10px;
                margin-right: 10px; 
            }
        }
    }
}
.register-user-body{
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    height: 350px;
    .MuiInputBase-root{
        border-radius: 10px;
    }
}
.new-user-label{
    font-size: 18px;
    font-family: Dejavu-Sans;
    padding-bottom: 20px;
}
.signup-button{
    margin-top: 25px;
    width: 150px;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    span{
        font-size: 18px;
        font-family: Dejavu-Sans;
        line-height: 24px;
    }
}
.MuiInputBase-input{
    font-size:17px !important;
}
`;