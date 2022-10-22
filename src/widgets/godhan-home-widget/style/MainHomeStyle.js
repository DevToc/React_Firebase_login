import styled from "styled-components";

export const mainHomeStyle = styled.div`
.Mui-selected{
  background:#224214;
  color:#fff;
}
.grid{
  margin-top: 5px;
  margin-bottom: 5px;
}

.autocomplete-selected{
  display: flex;
  background-color: white;
  padding: 16.5px;
  margin-right: 1px;
  margin-top: auto;
  margin-bottom: auto;
  border: 1.5px solid lightgray;
  border-radius: 4px;
  .location-ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 93%;
  }
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

.display-flex{
  display: flex;
}
.use-my-location{
  height: 45px;
  margin-top: 2px;
}
.MuiAutocomplete-inputRoot{
  padding: 5px;
  background-color: white;
  border-radius: 0px;
}
.text-align-right{
  text-align: right;
}
.selected-location{
  background-color: white;
  padding: 13px;
  margin-right: 1px;
  margin-left: 1px;
  height: 100%;
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
    padding: 12px;
  }
}
.clear-icon{
  margin-left: 5px
}
.floating-button{
    position: fixed;
    right: 1rem;
    top: 29rem;
    z-index: 1;
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
}
.MuiInputLabel-outlined{
}
}
@media only screen and (max-width: 600px){
  .header-alignment{
 font-size:20px;
}
.no-item-found{
  font-size:20px;
}
}


.hot-categories-header{
  text-transform: uppercase;
}
.header-alignment{
  display: flex;
  justify-content: center;
  text-transform: uppercase;
}
.heading {
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  text-align: center;
}
.tabs-header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  height:42px;
  .tabs-width{
    background-color: transparent;
    width: 100%;
    max-width: 800px;
  }
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
  width:0.5px;
  margin-right: 10px;
  margin-top:-1rem;
 }
 
 .MuiContainer-root{
   margin-bottom: 2rem;
 }
 .display-flex{
   .left-pane{
     background-color: #F8F8F9;
     width: 100%;
     padding: 5px 10px 0 10px;
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
                  padding: 3px!important;
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
    margin-left: 0.5rem;
      font-size: 0.875rem;
    background-color: white;
      opacity: 0.7;
    margin-top: 2px;
}  
 .search-button{
    height: 94%;
    width:100%;
    background: #224214;
    color: white;   
    border-radius:4px;
    margin-left: 1px;
}
  .current-location-icon{
      padding: 15px !important;
      background: white;
      border: 1.5px solid lightgray;
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

  .MuiTabs-fixed {
    border: none;
    padding: 3px 4px;
    border-radius: 5px;
  }

  .MuiTab-root {
    border: none;
    border-right: 2px solid #224214B2 !important;
    min-height: initial;
    height: 36px;
    padding: 0;
  }

  .MuiTab-root:last-child {
    border-right: 0 !important;
  }

  .MuiTab-root.Mui-selected {
    border-radius: 6px;

  }

  .MuiTabs-root {
    min-height: initial;
    background-color: white;
    border-radius: 6px;
  }

  .MuiAppBar-root {
    border-radius: 6px;
    border-bottom: 0;
    border: 2px solid #224214;
    color: #001D48;
  }

  .MuiAppBar-root.MuiPaper-elevation4 {
    box-shadow: initial;
  }

  .MuiTab-wrapper {
    font-size: 16px;
    //font-weight: 600;
    text-transform: uppercase;
  }

  .search {
    background-color: white;
    border: none;
    outline: none;
    height: 42px;
    width: 100%;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
  }

  .searchContainer {
    display: flex;
    background-color: white;
    justify-content: space-between;
    margin-top: 20px;
    border-radius: 5px;
  }


  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
        padding:9px !important;
        border-radius: 4px;
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
