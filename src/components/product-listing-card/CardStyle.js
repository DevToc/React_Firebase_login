import styled from "styled-components";

const cardStyle = styled.div`
  .card-price-tag {
    color: white !important;
    text-align: center !important;
    text-transform: uppercase !important;
    z-index: 1 !important;
    //border-radius: 5px !important;
    font-weight: 500 !important;
    display: flex !important;
    flex-direction: column !important;
    position: absolute !important;
    background-color: #00000073 !important;
    right: 0 !important;
    background: rgba(140, 69, 11, 0.8) !important;
    border-radius: 5px 0px 0px 5px !important;
    min-width: 60px !important;
    min-height: 24px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-top: -24px !important;
    top: initial !important;
    height: initial !important;
  }
  .card-currency-tag {
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    margin: 0 !important;
  }
  .card-listedPrice-tag {
    font-size: x-large;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    line-height: 24px;
  }

  .MuiPaper-root {
    padding-bottom: 0px;
    border-radius: unset;
    box-shadow: initial !important;
  }
  .MuiPaper-elevation1 {
    box-shadow: none;
  }
  .MuiCardActionArea-focusHighlight {
    background-color: white !important;
  }
  .product-extra-details {
    display: flex;
    justify-content: space-between;
    height: 25px;
    flex-direction: row;
    border-top: 1px solid #c4c4c4;
    padding-top: 2px;
    margin: 0 9px;
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    .MuiTypography-root {
      width: 50%;
      height: 40px;
      .MuiBox-root {
        text-align: left;
      }
    }
  }

  .card-container {
    background-size: contain;
    border: solid #b5adad7d 0.8px;
  }
  .text-limiter {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #616976;
  }
  .MuiCardActions-root {
    padding: 0;
    border-top: solid black 1px;
  }

  .badge {
    width: 100%;
    .home-page-card {
      width: 100%;
    }

    .MuiBadge-badge {
      margin-right: 4rem;
      background: #ffce32;
    }
    .MuiCard-root {
      border-top: 2px solid #ffce32;
      border-bottom: 2px solid #ffce32;
    }
  }

  .rentDuration {
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #001d48;
    white-space: nowrap;
  }

  .description {
    font-family: Dejavu-Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #001d48;
  }

  .MuiCard-root {
    border-radius: 5px;
    .MuiCardActionArea-root {
      .MuiCardMedia-root {
        border: 0px;
        border-radius: 6px;
      }
      .MuiCardContent-root {
        padding: 5px 0px;
        text-align: left;
        height: 67px;
        .display-flex {
          display: flex;
        }
        .display-title {
          font-family: Dejavu-Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          color: #001d48;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title-section {
          display: flex;
        }
        .title {
          .MuiBox-root {
            border-bottom: solid black 1px;
            width: 160%;
          }
        }
      }
    }
  }
`;

export default cardStyle;
