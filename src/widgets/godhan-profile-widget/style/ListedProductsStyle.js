import styled from "styled-components";
export const listedProductsStyle = styled.div`
  .listingContainer {
    padding: 0px 18px 65px 18px;
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sortButton {
    display: flex;
    align-items: center;
    padding: 5px 7px;
    background-color: #224214;
    border-radius: 5px;
    color: white !important;
    font-size: 15px;
    margin-right: auto;

    .sortButtonIcon {
      color: white !important;
    }
  }

  /* .listed-products-header{
    margin-top: 2rem;
    margin-left:1rem;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
}
.listing-heading{
        font-size:24px;
    }
@media only screen and (max-width: 600px) {
    .listing-heading{
        font-size:20px;
    }
}
.image-icon{
    transform: scale(1.8);
}
.margin-right{
    margin-right: 1rem;
}
@media only screen and (max-width: 350px) {
    .margin-right{
        margin-right: 0.5rem;
    }
}
.display-flex{
    display: flex;
}
.justify-content{
    justify-content: space-evenly
}
.actions-link-spaced{
    background-color: transparent;
    color: ${(props) => `${props.theme.palette.primary.main}`};
    text-decoration: underline;
    cursor: pointer;
}
.mar-right{
    margin-right: 1rem;
}
.productTitle{
    text-transform: capitalize;
}
.padding-fix{
    .MuiTableCell-root{
        padding-left: 4px;
        padding-right: 4px;
    }
}
.actions-link{
  background-color: transparent;
  color: ${(props) => `${props.theme.palette.primary.main}`};
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 100px;
}
@media only screen and (max-width: 600px) {
    .actions-link {
    flex-direction:column;
    align-item:center;
  }
}
@media only screen and (max-width: 600px) {
    .actions-link-spaced {
    font-size:10px;
  }
}

.column{
  width: 100px; 
  text-align:center;
  position: relative;
}
.column-twice{
    width: 200px;
    text-align: center;
    position: relative;
}
.listed-products-table{
    .MuiTableBody-root{
        .MuiTableRow-root{
            .MuiTableCell-body{
                .row{
                    display: flex;
                    justify-content: space-between;
                    .column{
                        
                        flex-direction: column;
                        .no-image-container{
                            padding-left: 25px;
                            padding-right: 25px;
                        }
                        .product-image-container{
                            width: 75px;
                            text-align: center;
                            .product-img{
                                border: 1px dotted #555;
                                height: 5rem;
                                width: 5rem;
                            }
                        }
                    }
                }
            }
        }
    }
} */
`;
