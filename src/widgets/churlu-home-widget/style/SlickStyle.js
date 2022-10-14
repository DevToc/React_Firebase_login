import styled from "styled-components";
export const slickStyle = styled.div`
  .item {
    text-align: center;
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }

  .image {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 7px;
  }

  .category-name {
    font-family: Lato;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    color: #001d48;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  @media only screen and (max-width: 480px) {
    .category-name{
      max-width: 100%;
    }
  }

  .heading {
    font-family: Lato;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #001d48;
    text-align: center;
  }
  .slick-prev:before, .slick-next:before{
    color:#2b579a !important;
  }
`;
