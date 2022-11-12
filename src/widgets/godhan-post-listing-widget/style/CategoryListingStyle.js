import styled from 'styled-components';
export const categoryListingStyle = styled.div`
.card{
    transition: 0.3s;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid grey;
}
@media only screen and (max-width: 600px) {
    .card {
      width: 90%;
    }
  }

  .MuiTreeView-root{
    overflow-x: hidden;
    display: flex;
    margin-bottom: 50px;
    height: 110px;
    flex-grow: 1;
    display: flex;
    margin-bottom: 50px;
    min-height: 55vh;
    .MuiCollapse-container{
        .MuiCollapse-wrapper{
            .MuiCollapse-wrapperInner{
                .Mui-selected{
                    .MuiTreeItem-content{
                      .MuiTreeItem-label{
                        width: auto;
                      }
                    }
                  }
                .MuiTreeItem-root{
                    .MuiTreeItem-content{
                        margin: 2px;
                        width: 100%;
                        background-color: white;
                        padding: 3px;
                        }
                    }
                }
            }
        }
    }
    
}
.category-listing{
    display: flex;
    width: 60%;
    ul{
        margin-bottom: 5px;
    }
}
.set-selected{
    .MuiTreeItem-content{
        background-color: #8c450b !important;
        .MuiSvgIcon-fontSizeInherit{
            color: white;
        }
        .MuiTreeItem-label{
            color: white;
        }
    }
}
.selectedCategoryHeader{
    font-weight: 400
}
.Mui-disabled{
    background-color: lightgray;
}

`