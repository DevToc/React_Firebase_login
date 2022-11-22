import React from 'react';
import { Stepper, Step, StepLabel, Button, StepContent, Typography, Box } from '@material-ui/core';
import { headerAndStepperStyle } from '../style';
import { ListingTypeSelectComponent } from './ListingTypeSelect';
import { SelectCategoryAndBreedComponent } from './SelectCategoryAndBreed';
import _get from 'lodash/get';

export const HeaderAndStepperComponent = (props) => {
  const { activeStep, setActiveStep, listingForm } = props;

  const handleNext = () => {
    if (activeStep === 0 && !_get(listingForm, "selectedListingType.value")) return;
    if (activeStep === 1 &&
      (!_get(listingForm, "selectedCattle.value.value") || !_get(listingForm, "selectedBreed.value.value")))
      return;
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
      description: "Add the basic information on the {cattle name selected in step 2} you would like to list"
    },
    {
      label: "Cattle Information",
      description: "Add relevant information on the  {cattle name & breed selected in step 2} you would like to list"
    },
    {
      label: "Contact Information",
      description: "Supply your contact information that a buyer can reach you on to proceed."
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
                    disabled={index === 0}
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
