import React, { useState, useEffect } from 'react';
import { mainCreateCattleAdMapStateToProps, mainCreateCattleAdMapDispatchToProps } from './models';
import { connect } from 'react-redux';
import { HeaderAndStepperComponent } from './components/HeaderAndStepperComponent';
import BackHeader from '../../components/back-header/BackHeader';
import { globalUtils } from '../../utils';
import { formConstants } from './utils/PostListingConstants';
import { formConstants as profileFormConstants } from '../godhan-profile-widget/utils'
import _get from 'lodash/get';
import { isPlatform } from '@ionic/react';
import { HorizontalStepperComponent } from './components/HorizontalStepperComponent';
import { Header } from '../../components';

const MainCreateCattleAd = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const { setFormData, listingForm, userDetails } = props;

  useEffect(() => {
    setFormData(formConstants);
    const loc = JSON.parse(localStorage.getItem("godhan-display-location"));
    if (sessionStorage.getItem("godhan-flow") !== "edit-profile") {
      setFormData({
        listingForm: {
          ...formConstants.listingForm,
          selectedLocation: {
            ...formConstants.listingForm.selectedLocation,
            value: _get(listingForm, "selectedLocation.value") || _get(loc, "selectedLocation"),
          },
          searchBy: {
            ...formConstants.listingForm.searchBy,
            value: _get(listingForm, "selectedLocation.value") ||
              _get(loc, "selectedLocation"),
          },
          latitude: {
            ...formConstants.listingForm.latitude,
            value: _get(listingForm, "latitude.value") || _get(loc, "latitude"),
          },
          longitude: {
            ...formConstants.listingForm.longitude,
            value: _get(listingForm, "longitude.value") || _get(loc, "longitude"),
          },
          contactEmail: {
            ...formConstants.listingForm.contactEmail,
            value: _get(userDetails, "email"),
          },
          contactNumber: {
            ...formConstants.listingForm.contactNumber,
            value: _get(userDetails, "mobileNumber"),
          },
        },
        profileForm: profileFormConstants.profileForm
      });
    }
  }, []);

  return isPlatform('desktop') ? (
    <>
      <Header title="List your Cattle" />
      <HorizontalStepperComponent activeStep={activeStep} setActiveStep={setActiveStep} listingForm={listingForm} />
    </>
  ) : (
      <>
        <BackHeader
          title={globalUtils.getCurrentPage() === 'listing' ? "List your Cattle" : "Editing a Listing"}
        />
        <HeaderAndStepperComponent activeStep={activeStep} setActiveStep={setActiveStep} listingForm={listingForm} />
      </>
    )
};


const MainCreateCattleAdWidget = connect(
  mainCreateCattleAdMapStateToProps,
  mainCreateCattleAdMapDispatchToProps
)(MainCreateCattleAd)

export { MainCreateCattleAdWidget }