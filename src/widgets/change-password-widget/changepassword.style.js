import styled from 'styled-components'

export const changePasswordWidgetStyle = styled.div`
.change-password-body{
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15%;
    .change-password-button{
        margin-top: 25px;
        width: 150px;
        height: 45px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        span{
            font-size: 18px;
            font-family: Lato;
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