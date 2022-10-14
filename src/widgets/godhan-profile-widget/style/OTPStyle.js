import styled from 'styled-components'
export const oTPStyle = styled.div `
.otp-input {
  font-family: inherit;
  font-size: 1rem;
  width: 100% !important;
  height: 50px !important;
  line-height: 40px;
  ${(props) => props.theme.breakpoints.down('xs')} {
    width: 100% !important;
    height: 40px !important;
    font-size: 1.5rem;
    line-height: 40px;
    margin: 0 5px 15px;
  }
  margin: 0 5px 10px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0px 0px 6px #00000029;
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  outline: none;
  &--focused {
    border: 3px solid ${(props) => props.theme.palette.primary.main};
  }
}
.resend-otp {
  justify-self: end;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  p {
    margin: 0;
  }
`