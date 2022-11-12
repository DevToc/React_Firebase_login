import styled from 'styled-components';
export const categorySelectionStyle = styled.div`
.card{
    transition: 0.3s;
    text-align: center;
    margin-right: 10px;
    height: 15rem !important;
    width: 15rem;
    padding: 10px;
    cursor: pointer;
    background-color:#fff;
    border: solid 1px grey;
    box-shadow: 3px 3px 5px 2px rgb(51 99 171 / 40%), 0 0 0px 0px rgb(40 43 181 / 12%), 0 0 0px 0px rgb(45 24 8 / 94%); 
}
.card:hover{
    border: solid #041735 1.2px;
    box-shadow: 3px 3px 15px 4px #8c450b, 0 0 0px 0px rgb(40 43 181 / 12%), 0 0 0px 0px rgb(8 23 45 / 94%);
}
.listing-options-section{
    display: flex;
    justify-content: center;
    max-width: 20%;
}
.listing-type-card-title{
    font-weight: 600;
}
@media only screen and (min-width: 351px) and (max-width: 600px) {
    .card{
        width: 10rem;
        height: 17rem !important;
    }
}
@media only screen and (max-width: 600px) {
    .card{
        width: 10rem;
        height: 15rem !important;
    }
    .MuiTypography-root {
    margin: 0;
    margin-top: 3px;    
    }    
    p {
    font-size: 13px!important;
    }
}

.primary-color{
    background-color:  #ddd;;
}
`