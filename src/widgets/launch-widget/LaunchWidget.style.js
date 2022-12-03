import styled from "styled-components";

export const launchWidgetStyle = styled.div`
  .godhan-container {
    display: flex;
    height: 100vh;
    flex-direction: column;
    position: relative;
    height: 100vh;
    background-image: url("/assets/images/auth-bg-image.png");
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(43, 87, 154, 1);
    background-size: cover;
    background-blend-mode: soft-light;
    .body-section {
      margin-top: 57%;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .godhan-title {
        color: #ffffff;
        font-family: "DejaVuSansMono-Oblique";
        font-style: normal;
        font-weight: normal;
        font-size: 56px;
        line-height: 57px;
        letter-spacing: 0.01em;
      }
      .godhan-sub-title {
        color: #ffffff;
        font-family: "DejaVuSansMono-Oblique";
        font-style: normal;
        font-weight: normal;
        font-size: 26px;
        line-height: 30px;
        margin-top: 11px;
      }
    }
    .footer-image {
      position: absolute;
      bottom: 0;
      object-fit: cover;
      width: 100%;
      max-height: 160px;
    }
    .location-select-dropdown {
      margin-top: 10vh;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      .select-location {
        width: 100%;
        height: 46px;
        background: #ffffff;
        border-radius: 5px;
        .MuiSelect-root {
          display: flex;
          font-family: Dejavu-Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 17px !important;
        }
        .country-label {
          margin-top: auto;
          margin-bottom: auto;
        }
        .MuiSelect-root {
          margin-left: 10px;
          option {
            width: 80%;
          }
        }
        .MuiSelect-icon {
          margin-right: 18px;
        }
      }
    }
    .button-section {
      margin-left: auto;
      margin-right: auto;
      .get-started-button {
        width: 150px;
        height: 45px;
        background: #ffffff;
        border-radius: 5px;
        color: #344654;
        text-transform: capitalize;
        margin-top: 33px;
        padding: 0;
        .MuiButton-label {
          font-size: 20px;
          font-family: "DejaVuSansMono-Oblique";
          font-style: normal;
          font-weight: normal;
          letter-spacing: 0.01em;
        }
      }
    }
  }
`;
