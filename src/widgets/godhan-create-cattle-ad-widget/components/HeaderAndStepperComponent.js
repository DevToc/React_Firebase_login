import React from 'react';
import { Stepper, Step, StepLabel, Button, StepContent, Typography, Box } from '@material-ui/core';
import { headerAndStepperStyle } from '../style';
import { ListingTypeSelectComponent } from './ListingTypeSelect';
import { SelectCategoryAndBreedComponent } from './SelectCategoryAndBreed';
import _get from 'lodash/get';
import { ListingInformationComponent } from './ListingInformationComponent';
import { ContactInformationComponent } from './ContactInformationComponent';
import { CattleInformationComponent } from './CattleInformationComponent';
import { isPlatform } from '@ionic/react';

export const HeaderAndStepperComponent = (props) => {
  const { activeStep, setActiveStep, listingForm } = props;

  const handleNext = () => {
    if (activeStep === 0 && !_get(listingForm, "selectedListingType.value")) return;
    if (activeStep === 1 &&
      (!_get(listingForm, "selectedCattle.value") || !_get(listingForm, "selectedBreed.value")))
      return;
    if (activeStep === 2) {
      if (!_get(listingForm, "productTitle.value")
        || !_get(listingForm, `listedPrice.value`)
        || !_get(listingForm, 'productDescription.value')
        || !_get(listingForm, "productTitle.isValid")
        || !_get(listingForm, `listedPrice.isValid`)
        || !_get(listingForm, 'productDescription.isValid'))
        return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const steps = [
    {
      label: "Select Listing Type",
      description: "What would you like to do first?",
      component: <ListingTypeSelectComponent />
    },
    {
      label: "Select Cattle Type",
      description: "Select Cattle & Breed to proceed.",
      component: <SelectCategoryAndBreedComponent />
    },
    {
      label: "Listing Information",
      description: `Give an overview on the ${_get(listingForm, "selectedCattleObject.value.name")} - ${_get(listingForm, "selectedBreedObject.value.name")}`,
      component: <ListingInformationComponent />
    },
    {
      label: "Cattle Information",
      description: `Add some more cattle specific information`,
      component: <CattleInformationComponent />
    },
    {
      label: "Contact Information",
      description: "Adding your contact information will boost your chances of your sale.",
      component: <ContactInformationComponent />
    }
  ];
  return (
    <StyledHeaderAndStepper>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 5 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <br />
              {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color="primary"
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={[0, 1].includes(index)}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </StyledHeaderAndStepper>
  )
};

const StyledHeaderAndStepper = headerAndStepperStyle;
