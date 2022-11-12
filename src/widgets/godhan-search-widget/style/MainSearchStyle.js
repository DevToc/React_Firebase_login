import styled from "styled-components";

export const mainSearchStyle = styled.div`

.label {
  font-weight: 600 !important;
  font-size: 18px !important;
  color: #001D48 !important;
  margin: 0 !important;
}


.Mui-selected{
  background:#8c450b;
  color:#fff;
}
.filters-box{
  flex-basis: 22.666667%;
  border: solid #b5adad7d 1px;
  border-radius: 8px;
  padding: 1rem;
  //background-color: red;
  background: white;
}
.search-section{
  margin-top: 12px;
  overflow: hidden;
}
.filter-checkbox{
  padding: 5px;
}
.MuiCollapse-container.MuiTreeItem-group.MuiCollapse-entered{
    position: absolute;
    background-color: #f9f9f9;
    min-width: 184px;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
    padding: 12px 16px;
    z-index: 999;
    width: 500px;
    max-height: 30rem;
    overflow: scroll;
    overflow-x: hidden;
}
.MuiTreeItem-root.Mui-selected{
    background:#fff;
    color:#fff;
}
.Mui-expanded{
    background:white !important;
}
.search-div{
  .MuiFormControl-root{
    margin: 0px;
    .MuiInputBase-root{
      background: white;
      line-height: 1.43px;
      border-radius: 0px;
      .MuiInputBase-input{
        padding: 14.5px 14px;
      }
    }
  }
}
.clear-icon{
  margin-left: 5px
}
.price-component{
  display: flex;
  .MuiFormControl-root{
    input{
      margin-top: 2px;
      font-size: 0.875rem;
      opacity: 0.7;
      white-space: nowrap;
    }
    .MuiInputBase-root{
      input{
        padding: 9.5px 7px;
      }
    }
  }
}
.radius-filter{
  .MuiAutocomplete-root{
    .MuiFormControl-fullWidth{
      width: 48%;
      .MuiFormLabel-root{
        margin-top: -10px;
      }
      .MuiInputBase-root{
        input{
          padding: 0;
          margin-top: 2px;
          font-size: 0.875rem;
          opacity: 0.7;
          white-space: nowrap;
        }
      }
    }
  }
}
.display-only-flex{
  display: flex;
}
.MuiInput-underline{
  .MuiSelect-select{
    padding-bottom: 0;
    margin-top: 5px;
  }
  .MuiSelect-icon{
    padding-bottom: 0;
    margin-top: 8px;
  }
}
.MuiInput-underline:before{
  border-bottom: 0 none;
}
.MuiInput-underline:after{
  border-bottom: 0 none;
}
.use-my-location{
  height: 45px;
  margin-top: 2px;
}
.view-more{
  float: right;
  padding-bottom: 1rem;
  text-decoration: underline;
  cursor: pointer;
}
.text-align-right{
  text-align: right;
}
.autocomplete-selected{
  background-color: white;
  padding: 16.5px;
  margin-right: 1px;
  margin-top: auto;
  margin-bottom: auto;
  border: 1.5px solid lightgray;
  border-radius: 4px;
  display: flex;
  .location-ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 93%;
  }
}
.selected-location{
  background-color: white;
  padding: 13px;
  margin-right: 1px;
  margin-left: 1px;
  height: 100%;
}
#search-header{
  padding-top: 10px;
  padding-left: 25px;
}
@media only screen and (max-width: 768px) {
  .selected-location{
    margin-right: 0px;
    margin-left: 0px;
  }
}
.use-my-location-text{
  background-color: white;
  .use-my-location{
    width: 99%;
  }
  @media only screen and (min-width: 750px) and (max-width: 1024px){
    .use-my-location{
      width: 99.5%;
    }
  }
}
.MuiGrid-root{
  .MuiButton-contained{
    // padding: 12px;
  }
} 
  .view-more{
    float: right;
    padding-bottom: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }
  
.react-swipeable-view-container > div{
  overflow:hidden !important;
  div{
    padding-bottom: 0px;
  }
}
.show-more-component{
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.floating-button{
  position: fixed;
  right: 1rem;
  top: 29rem;
  z-index: 1;
}
@media only screen and (max-width:600px){
  #search-header{
    font-size:20px;
    padding-top:20px;
    padding-right: 10px;
  }
}
.home-page-card{
  .MuiPaper-root{
    padding-bottom: 0px;
    border-radius: unset;
     box-shadow:  3px 3px 5px 2px rgb(51 99 171 / 40%), 0 0 0px 0px rgb(40 43 181 / 12%), 0 0 0px 0px rgb(45 24 8 / 94%);
  }
  .MuiPaper-root:hover{
        box-shadow: 3px 3px 15px 4px #8c450b, 0 0 0px 0px rgb(40 43 181 / 12%), 0 0 0px 0px rgb(8 23 45 / 94%);
  }
  .product-extra-details{
    display:flex;
    justify-content:space-between;
    border-top: 1px solid grey;
    height: 25px;
    flex-direction: row;
    border-top: solid #b5adad7d 0.8px;
    .MuiTypography-root{
      width: 50%;
      height: 40px;
      .MuiBox-root{
        text-align: left;
      }
    }
  }
  .MuiCard-root{
    border: 1px solid rgb(148 142 142);
    border-radius: 10px;
    .MuiCardActionArea-root{
      .MuiCardMedia-root{
        border: solid #b5adad7d 0.8px;
        border-radius: 6px;
      }
      .MuiCardContent-root{
        padding: 16px 0px;
        text-align: left;
        height: 67px;;
        .display-flex{
          display: flex;
        }
        .display-title{
        }
        .title-section{
          display: flex;
        }
        .title{
          .MuiBox-root{
            border-bottom: solid black 1px;
            width: 160%;
          }
        }
      }
    }
  }
  }
}
.badge{
width: 100%;
.home-page-card{
    width: 100%;   
}
.MuiBadge-badge{
        margin-right: 4rem;
        background: #ffce32;
    }
.MuiCard-root{
        border-top: 2px solid #ffce32;
        border-bottom: 2px solid #ffce32;
}
}
.header-alignment{
  display: flex;
  justify-content: center;
}
.tabs-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .tabs-width{
    background-color: transparent;
    width: 70%;
  }
  @media only screen and (max-width: 768px) {
    .tabs-width{
      width: 100%
    }
  }
}
.MuiTypography-h6{
  font-size: 14px;
  font-weight: 500;
}
 
.post-ad-button{
  margin-right: 5%;
  border-radius: 25px;
  border-bottom: 4px solid #FECEAB;
  border-top: 4px solid #E8175D;
  border-left: 4px solid #F7DB4F;
  border-right: 4px solid #45ADA8;
}

.vertical-row {
  height:28px;
  width:2rem;
  margin-right: 10px;
  margin-top:-1rem;
  margin-left: 20px !important;
 }
 .card-container{
  background-size: contain;
 }
 .text-limiter{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #616976;
  
  
 }
 .MuiCardActions-root{
  padding: 0;
  border-top: solid black 1px;
 }
 .MuiContainer-root{
   margin-bottom: 5rem;
 }
 .display-flex{
   .left-pane{
     background-color: #f8f8f9;
     width: 80%
   }
   @media only screen and (max-width: 768px) {
    .left-pane{
      width: 100%
    }
  }
@media only screen and (min-width: 600px) and (max-width: 1023px) {
  .left-pane{
    width: 100%
    }
  }
   .right-pane{
    background-color: lightgray;
    height: 306px;
    width: 300px;
    img{
      width: 100%;
      height: fit-content;
    }
   }
 }
 .google-ad-mobile{
  background-color: lightgray;
  height: 331px;
  width: 100%;
 }
 .MuiTabs-fixed{
    border: solid 1px;
    border-bottom: 0px;
  .MuiButtonBase-root{
    border-right: solid gray 1px;
  }
  .makeStyles-Tab-2{
    border-right: solid gray 1px;
  }
 }
 #location-controllable-states, #search-within-radius{
   width: 100%;
 }
 #location-controllable-states-label{
   text-transform: capitalize
 }
 .MuiSvgIcon-root{
    font-size: 1.2rem;
 }
 .action-buttons{
    margin-left: auto;
    margin-right: auto;
 }
 .card-price-tag{
    color: white;
    width: 100px;
    height: 30px;
    text-align: center;
    text-transform: uppercase;
    z-index: 1;
    border-radius: 5px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #00000073;
    top: 59%;
    right: 0;
 }
 .card-currency-tag{
    margin-top: 5px;
 }
 .card-listedPrice-tag{
    font-size:x-large
 }
 .advertisement-section{
   background-color: lightgray;
   height: 100%;
 }
 .MuiTreeView-root{
  overflow-x: hidden;
  display: flex;
  flex-grow: 1;
  display: flex;
  .MuiCollapse-container{
      .MuiCollapse-wrapper{
          .MuiCollapse-wrapperInner{
              .MuiTreeItem-root{
                .MuiTreeItem-content{
                  margin: 2px;
                  border: solid 1px grey;
                  width: 100%;
                  background-color: white;
                  padding: 10px;
                }
              }
          }
      }
  }
}
.MuiTreeItem-root{
  width: 99%;
  margin: auto;
}
.button-section{
  display: flex;
  justify-content: space-evenly;
  .MuiButton-root{
    height: 20px;
  }
}
.category-listing{
      background: white;
      padding: 16.5px;
      max-height: 55.5px;
      border-radius: 4px;
      border: 1.5px solid lightgrey;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
}
.MuiTypography-body1{
    font-size: 0.875rem;
    opacity: 0.7;
    white-space: nowrap;
    color: #00060e;
}

.MuiTreeItem-label{
  color: black;
}
.grid{
    margin-top: 5px;
    margin-bottom: 5px;
}
.display-flex{
  display: flex;
  justify-content: space-between;
}
.search-button{
    height: 94%;
    width:100%;
    background: #8c450b;
    color: white;   
    border-radius:4px;
    margin-left: 1px;
}
.current-location-icon{
    padding: 15px !important;
    background: white;
    border: 1.5px solid lightgray;
    border-radius: 4px;
    border-radius: 4px 0px 0px 4px;
    border-right: none;
}
.location-section{
  .MuiOutlinedInput-adornedEnd{
    .MuiOutlinedInput-notchedOutline{
      border-radius: 0px 4px 4px 0px;
      border-left: none;
    }
  }
}
.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
    padding:9px !important;
}


.filters {
  display: flex;
  align-items: center;
  
  margin-top: 10px;
  overflow-x: scroll;
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}

.filters::-webkit-scrollbar {
  display: none;
}

.filter {
  display: flex;
  padding: 8px 5px 8px 8px;
  border-radius: 3px;
  color: white;
}


.search-results-header{
  text-transform: uppercase;
}
.autocomplete-selected{
      white-space: nowrap;
    }
    .all-categories-field{
      height: 100%;
     
      .MuiInputBase-root{
        .MuiOutlinedInput-notchedOutline{
          border: none;
          outline: none;
        }
      }
    }
 `;
