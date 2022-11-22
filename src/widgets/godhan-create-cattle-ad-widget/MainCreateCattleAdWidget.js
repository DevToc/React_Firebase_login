import React, { useState, useEffect } from 'react';
import { mainCreateCattleAdMapStateToProps, mainCreateCattleAdMapDispatchToProps } from './models';
import { connect } from 'react-redux';
import { HeaderAndStepperComponent } from './components/HeaderAndStepperComponent';
import BackHeader from '../../components/back-header/BackHeader';
import { globalUtils } from '../../utils';
import { formConstants } from '../godhan-post-listing-widget/utils';


const MainCreateCattleAd = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  const { setFormData, listingForm } = props;

  useEffect(() => {
    setFormData(formConstants);
  }, []);

  return (
    <>
      <BackHeader
        title={globalUtils.getCurrentPage() === 'listing' ? "List your Cattle" : "Editing a Listing"}
      />
      <HeaderAndStepperComponent activeStep={activeStep} setActiveStep={setActiveStep} listingForm={listingForm}/>
    </>
  )
};


const MainCreateCattleAdWidget = connect(
  mainCreateCattleAdMapStateToProps,
  mainCreateCattleAdMapDispatchToProps
)(MainCreateCattleAd)

export { MainCreateCattleAdWidget }