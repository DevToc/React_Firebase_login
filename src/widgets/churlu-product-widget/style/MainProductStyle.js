import styled from "styled-components";
export const mainProductStyle = styled.div`

.send-message-container {
    width: 500px;
    height: 500px;
    background-color: white;
    
}
h2{
    font-size: 18px;
}


.heading {
    font-family: Lato;
    font-style: normal;
    font-weight: bold ;
    font-size: 20px !important;
    color: #001D48;
    margin-bottom: 8px;
}

.heading-sm {
    font-family: Lato;
    font-style: normal;
    font-weight: bold ;
    color: #001D48;
}
.key-font-weight{
    font-weight: 600 !important
}
.estate-text { 
    font-family: Lato;
    font-style: normal;
    font-weight: 600;
    font-size: 15px !important;
    margin: 0;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.78);
}

.real-estate-features {
    display: flex;
    align-items: center;

    span {
        font-family: Lato;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.78);
        margin-left: 17px;
    }
}
.real-estate-text{
    font-family: Lato !important;
    font-style: normal !important;
    font-weight: 300 !important;
    font-size: 16px;
}
p.text {
    font-family: Lato !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 18px !important;
    line-height: 22px !important;
    margin: 0;
    color: #344654  ;

}
p.text-small{
    font-family: Lato !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 22px !important;
    color: rgba(0, 0, 0, 0.76);
    white-space: break-spaces;
    text-align: justify;
    padding-right: 17px;
}
p.text-small-with-font-weight{
    font-family: Lato !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: 22px !important;
    color: rgba(0, 0, 0, 0.76);
}
.tab {
    text-align: center;
    padding: 10px 0;
    font-family: Lato;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #344654;
    background: #E9E9E9;
}

.tabActive {
    text-align: center;
    padding: 10px 0;
    font-family: Lato;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: white;
    background: #2B579A;
}

.userInfo {
    padding: 15px 0;
    border-top: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
    //width: 100%;
    display: flex;
    align-items: center;
    margin-right: 15px;

    .avatar {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 50px;
        height: 50px
    }

    .info {
        margin-left: 20px;

        .name {
            font-family: Lato;
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            color: #001D48;
        }

        .contact {
            font-family: Lato;
            font-style: normal;
            font-weight: 500;
            font-size: 17px;
            color: #1A97F1;
        }

    }
}

.price {
    font-family: Lato;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #001D48;
}

.location {
    font-family: Lato;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    color: #1A97F1;
    margin-right: 5px;
    /* overflow: hidden;
    text-overflow: ellipsis; */
    white-space: break-spaces;
    max-width: 70%;
    line-clamp: 2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    visibility: visible;
}

@media (max-width: 350px) {
    .location {
        font-size: 16px;
    }
}

.display-features {
    padding-left: 0;
    padding-left: 0 !important;
    font-family: Lato !important;
    font-style: normal !important;
    font-weight: 300 !important;
}


.MuiTypography-body1{
    font-weight: 400 !important;
    line-height: 1.5 !important;
}
.handleInterestIcon{
    padding:6px;
}
.profile-picture{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.notification-section{
    display: flex;
    flex-direction: column;
    color: red;
    align-items: center;
}
.currency{
    text-align: center;
    font-size: xx-large;
}
.bid-buttons{
    display: flex;
    justify-content: center;
    margin: 1rem;
}
.MuiCardHeader-title
{
    color: #2b579a;
    font-size: 20px;
    font-weight: 750;
}
.product-title{
    margin-bottom: 1rem;
}
.MuiCard-root {
    margin-bottom: 20px;
}



.MuiTypography-h6{
    font-size: 1rem;
    line-height: 1.2;
}
.display-section{
    display: flex;
    margin-left: 8px;
}
.MuiCardHeader-root {
    text-align: center;
    border-bottom: 1px solid lightgray;
    padding:0 !important;
}
.MuiCardContent-root{
    padding: 0 !important;
    margin:10px
}
.MuiFormControl-marginNormal{
   margin-top:10px !important;
   margin-bottom:-10px !important;
}
.parent-container{
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
}
.left-pane {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    .MuiCardContent-root {
        margin: 0
    }
    .view-product-img{
        height: 50px;
        border: 1px solid black;
        margin: 4px;
        width: 50px;
    }
    .display-image-selected{
        max-width: 90%;
        background-size: contain;
        height: 450px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
    @media only screen and (max-width: 768px) {
        .display-image-selected{
            height: 200px;
        }
        .left-arrow{
            margin-left:1px;
        }
        .right-arrow{
            margin-right: 1px;
        }
      }
    .img-selected{
        border: 3px solid gold;
    }
    .Description-view-count{
        display:flex;
        width:100%;
        justify-content: space-between;      
    }
    .Description-view-count{
        display:flex;
        width:100%;
        justify-content: space-between;      
    }  
    }
    .description-section{
        text-align:center;
        
    }
    .view-section{  
        color: white;
        height: 20px !important;
        margin-top: 7px;
        width: 55px;
        margin-right: 16px;
        height: 40px;        
        text-transform: uppercase;
        border-radius: 5px;
        font-weight: 900;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #00000073;
    }
    @media only screen and (max-width:770px)
    { 
        .view-section{  
        color: white;
        width: 3rem;
        height: 24px;        
        text-transform: uppercase;
        border-radius: 5px;
        font-weight: 900;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;;
        background-color: #00000073;
    }    
    }
    .display-features{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .display-property{
        text-transform: capitalize;
    }
}
.right-pane {
    position: fixed;
    width: 30%;
    .edit-product-component{
        width: 70%;
        margin: auto;
        margin-top: 8rem;
        .edit-product-header-component{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .edit-product-body-component{
            margin-top: 5rem;
            .edit-product-buttons{
                flex-direction: row;
                display: flex;
                margin-top: 1rem;
                .cancel-button{
                    margin-right: 2rem;
                }
            }
        }
    }
    .product-details-view-component{
        padding: 0.3rem;
        padding-top: 0;
        .extend-listing-alert{
            width: 100%;
            .MuiAlert-message{
                width: 100%;
                .extend-listing-button {
                    float: right;
                }
            }
        }
        h1{
            padding-bottom: 1rem;
        }
        .product-overview-header, .product-info-header{
            margin: auto;
            width: 96%;
            border-bottom: 1px solid lightgray;
            box-shadow: 6px 2px #aea4a466;
        }
        .product-overview-body, .product-info-body{
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 1rem;
            
            
            li{
                border-bottom: 1px solid lightgray;
                box-shadow: 6px 2px #aea4a466;
            }
        }
    }
}
.categoryInfo{
    border-bottom: 1px solid #C4C4C4;
    align-items: center;
    margin-right: 15px;
    font-family: Lato !important;
    font-size: 14px;
    font-weight: 900;
    line-height: 1.43;
    color: #2B579A;
    font-style: normal;
    font-feature-settings: normal;
    font-variant: normal;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    position: unset !important;
    overflow: unset !important;
    
    p::first-letter {
    text-transform:capitalize;
    }
}
.timeInfo{
    display: flex;
    justify-content: space-evenly;
    border: 1px solid #C4C4C4;
    margin-right: 15px;
    margin-top: 25px;
    font-family: Lato !important;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.43;
    color: rgba(0, 0, 0, 0.76);
    font-style: normal;
    font-feature-settings: normal;
    font-variant: normal;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    position: unset !important;
    overflow: unset !important;
    
    p::first-letter {
    text-transform:capitalize;
    }
    p {
        margin-left:5px;
    }
}
.margin-block{margin-block: 5px;}
`;
