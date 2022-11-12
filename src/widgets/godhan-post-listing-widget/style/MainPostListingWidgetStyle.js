import styled from 'styled-components';

export const mainPostWidgetStyle = styled.div`
.post-listing-form{
    border: 1px solid grey;
    background: #fff;
    margin-left:10px;
    margin-right:10px
}
@media only screen and (max-width: 600px) {
    .MuiGrid-grid-xs-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
    /* margin-bottom: -18px; */
    margin-top: -26px;
}
.MuiTypography-h6 {
    font-size: 1.25rem;
    font-family: "DejaVuSansMono-Oblique",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-weight: 500;
    line-height: 1.6;
    padding-top: 3px;
    margin-top: 0px;
    margin-bottom: 18px;
}
.header-section{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
`