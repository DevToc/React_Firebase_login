import styled from 'styled-components'

export const otpWidgetStyle = styled.div`
.otp-sub-title{
    font-size: 20px;
    font-family: Lato;
    line-height: 24px;
}
.MuiFormControl-marginNormal{
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 0px;
    display: flex;
}
.otp-container{
    background: #FFFFFF;
    border: 2px solid #2B579A;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 10px;
    width: 350px;
    margin-top:20px;
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
    .notification-container{
        margin-bottom: 0px !important;
        .MuiAlert-message{
            word-break: break-word;
        }
    }
}
.margin-subtitle{
    margin-bottom: 8px;
}
.otp-input {
    justify-content: center;
    display: flex;
  }
  .resend-otp{
      color: #2B579A;
      font-size: 20px;
      font-family: Lato;
      line-height: 24px;
  }
  .confirm-button{
    margin-top: 25px;
    width: 150px;
    height: 45px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    span{
        font-size: 20px;
        font-family: Lato;
        line-height: 24px;
    }
}
.margin-alignment{
    margin-top: 20px
}
.new-user-label{
    font-size: 18px;
}
.post-login{
    margin-top: 20px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}
.text-align-center{
    text-align: center;
}
`