import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import _includes from "lodash/includes";
import { mapDispatchToProps, mapStateToProps } from "./models";
import {
  HeaderComponent,
  ProductListing,
  ShowMoreComponent,
} from "./component";
import { useTheme } from "@material-ui/core";
import { formConstants } from "./utils";
import { globalConstants, updateFormStore, globalUtils } from "../../utils";
import {
  LoaderComponent,
  ModalComponent,
  BaseLayout,
} from "../../components";
import { mainHomeStyle } from "./style";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import CallToAction from "../../components/CallToAction";

const Home = ({
  type,
  setFormData,
  fetchHotCategoriesList,
  sellData,
  rentData,
  isAuthorized,
  loader,
  chatStatus,
  clearInterest,
  fetchFavouriteItems,
  fetchFavouriteIds,
  fetchAllItems,
  homeForm,
  userMessage,
  wantedData,
  clearProductList,
  userData,
}) => {
  const [isHomePage] = useState(!_includes(type, "favourites"));
  const [open, setOpen] = useState(false);
  const [isKeyboardOpened, setIsKeyBoardOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (chatStatus || userMessage) {
      setOpen(true);
    }
  }, [chatStatus, userMessage]);

  useEffect(() => {
    // if (_isEmpty(homeForm)) {
      setFormData(formConstants);
      const location = localStorage.getItem("godhan-display-location");
      if(!_isEmpty(location)){
        const locObject = JSON.parse(location);
        updateFormStore({ form: 'homeForm', field: 'latitude', value: _get(locObject, 'latitude')})
        updateFormStore({ form: 'homeForm', field: 'longitude', value: _get(locObject, 'longitude')})
        updateFormStore({ form: 'homeForm', field: 'radius', value: _get(locObject, 'radius')})
        updateFormStore({ form: 'homeForm', field: 'selectedLocationCountryCode', value: _get(locObject, 'selectedLocationCountryCode')})
        updateFormStore({ form: 'homeForm', field: 'selectedLocation', value: _get(locObject, 'selectedLocation')})
      }
      updateFormStore({
        form: "homeForm",
        field: "selectedType",
        value: "rent",
      });
    // }
    if (_includes(type, "favourites")) {
      fetchFavouriteItems({});
    } else {
      clearProductList()
      if (globalUtils.isTokenAvailable()) {
        fetchFavouriteIds({});
      }
      fetchHotCategoriesList({ type: "Rent" });
      fetchAllItems({
        offset: 0,
        listType: 'rent',
        limit: globalConstants.paginationLimit,
        initial: true
      });
      updateFormStore({
        form: "homeForm",
        field: "listType",
        value: "default",
      });
    }
    sessionStorage.removeItem("godhan-flow")
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    updateFormStore({ form: "homeForm", field: "sortBy", value: "New" });
    updateFormStore({ form: "homeForm", field: "skipFormClear", value: true });

    history.push({
      pathname: "search",
      state: {
        redirect: true,
      },
    });
  };

  const handleCloseClick = () => {
    clearInterest();
    updateFormStore({ form: "homeForm", field: "userMessage", value: "" });
  };

  const getData = () => {
    switch (_get(homeForm, "selectedType.value")) {
      case "sell":
        return sellData;
      case "rent":
        return rentData;
      case "wanted":
        return wantedData;
      default:
        return [];
    }
  };

  return (
    <>
      <BaseLayout isAuthorized={isAuthorized} isKeyboardOpened={isKeyboardOpened}>
        <div style={{ paddingBottom: 80, marginBottom: 30 }}>
          <StyledHome theme={useTheme()}>
              <HeaderComponent
                isHomePage={isHomePage}
                options={getData()}
                homeForm={homeForm}
                isAuthorized={isAuthorized}
                userData={userData}
                handleSearch={handleSearch}
                setIsKeyBoardOpen={setIsKeyBoardOpen}
              />
            <br />
            <CallToAction />
            <div style={{ padding: "0 4px" }}>
              <ProductListing />
              <ShowMoreComponent style={{ marginTop: 20 }} />
            </div>
          </StyledHome>
          <LoaderComponent loader={loader} />
          <ModalComponent
            open={open}
            setOpen={setOpen}
            message={
              _get(homeForm, "userMessage.value") ||
              (userMessage == null && globalConstants.messageSent)
            }
            handleCloseClick={handleCloseClick}
          />
        </div>
      </BaseLayout>
    </>
  );
};

export const HomeWidget = connect(mapStateToProps, mapDispatchToProps)(Home);

const StyledHome = mainHomeStyle;
