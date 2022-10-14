import React from "react";
import {
  ViewProfile,
  BidProducts,
  ListedProducts,
  SavedItems,
  RaiseTicket,
  EditProfile,
  ProfileVerification,
  ViewProfilePublic,
} from "../components";
import { ChangePassword } from "./ChangePassword";
import { TicketTracking } from "./TicketTracking";
export const ManageOptions = (props) => {
  const {
    selectedOption,
    setSelectedOption,
    auxiliaryOption,
    setAuxiliaryOption,
    publicUserId,
  } = props;

  const handleRender = () => {
    if (auxiliaryOption === 0) {
      switch (selectedOption) {
        case 0:
          return <ListedProducts setSelectedOption={setSelectedOption} isPublicProfile={!!publicUserId} />;
        case 1:
          return <SavedItems setSelectedOption={setSelectedOption} />;
        case 2:
          return (
            <EditProfile
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          ); //<BidProducts />;
        case 3:
          return publicUserId ? (
            <ViewProfilePublic
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
              selectedOption={selectedOption}
              publicUserId={publicUserId}
            />
          ) : (
              <ViewProfile
                setSelectedOption={setSelectedOption}
                setAuxiliaryOption={setAuxiliaryOption}
                selectedOption={selectedOption}
              />
            );
        case 4:
          return <BidProducts />;
        default:
          return;
      }
    }
    if (auxiliaryOption > 0) {
      switch (auxiliaryOption) {
        case 1:
          return (
            <RaiseTicket
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          );
        case 2:
          return (
            <EditProfile
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          );
        case 3:
          return (
            <ChangePassword
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          );
        case 4:
          return (
            <ProfileVerification
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          );
        case 5:
          return (
            <TicketTracking
              setSelectedOption={setSelectedOption}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          );
        case 6:
          return (
            <ListedProducts
              setSelectedOption={setSelectedOption}
              title="All Listings"
              isPublicProfile={!!publicUserId}
              setAuxiliaryOption={setAuxiliaryOption}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };
  return handleRender();
};
