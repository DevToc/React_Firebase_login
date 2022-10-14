import styled from 'styled-components'

export const registerWidgetStyle = styled.div`
.select-title{
    font-size: 20px;
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
    font-family: Lato;
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
        font-family: Lato;
        line-height: 24px;
    }
}
.MuiInputBase-input{
    font-size:17px !important;
}
`;