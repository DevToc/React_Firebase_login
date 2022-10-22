import styled from 'styled-components';

export const featuredListingStyle = styled.div`
.MuiContainer-root{
    display: flex;
}
.card{
    transition: 0.3s;
    text-align: center;
    margin-right: 10px;
    height: 11rem !important;
    width: 9rem;
    padding: 10px;
    cursor: pointer;
    background-color:#fff;
    border: solid 1px grey;
    margin: auto;
}

.color-grey{
    background-color: #a9a9a9;
    .MuiTypography-root{
        color: white !important;
        font-weight: 900;
        margin: auto;
    }
}
.color-green{
    background-color: #224214;
    .MuiTypography-root{
        color: white !important;
        font-weight: 900;
        margin: auto;
    }
}
.MuiSvgIcon-root{
    font-size: 7rem;
    color: white;
}


`