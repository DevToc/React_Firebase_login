import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {useTheme, Avatar, Table, TableRow, TableCell} from "@material-ui/core";
import _get from 'lodash/get';
import {
  viewProfileMapDispatchToProps,
  viewProfileMapStateToProps,
} from "../models";
import { ProfileOptionsCart } from "../components";
import { viewProfileStyle } from "../style";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { globalUtils } from "../../../utils";
import config from "../../../configs/appsettings.json";

const mapResponse = (data) => ({
  ...data,
  memberSince: globalUtils.getFormattedDateWithSourceFormat(
    data.memberSince,
    "YYYY-MM-DDThh:mm:ss:000Z",
    "MMM YYYY"
  ),
});

const fetchProfile = async (id) => {
  const userId = globalUtils.getValueFromUrlQuery("userId") || "";
  const response = await fetch(
    `${config.baseUrl}public/items/getUserProductDetails?productId=${id}&userId=${userId}`
  );

  const data = await response.json();
  return mapResponse(data);
};

const ViewProfilePublicComponent = ({
  setSelectedOption,
  setAuxiliaryOption,
  selectedOption,
  publicUserId,
  product
}) => {
  const history = useHistory();

  const [user, setUser] = useState({});

  useEffect(() => {
    const id = globalUtils.getValueFromUrlQuery("id");
    fetchProfile(id).then(setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSelection = () => {
    return (
      <div className="profile">
        <div className="navigation">
          <div
            onClick={() => history.goBack()}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ArrowBackIosIcon className="backIcon" />
            <span className="backText">Back</span>
          </div>
        </div>
        <header className="profileHeader">
          <div
            style={{
              marginTop: 20,
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={user.userImage} className="avatar" />
            <div className="userName">{user.userName || "Not available"}</div>
          </div>
          <ProfileOptionsCart
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            setAuxiliaryOption={setAuxiliaryOption}
            isPublic={!!publicUserId}
            otherListing={user.otherListings}
          />
        </header>

        <div className="personalInfo">
        <div className="user-info-container">
            <h2 style={{marginBottom:0}}>User Info</h2>
        </div>

            <Table>
                    <TableRow>
                        <TableCell variant="head" className="infoLabel" >Member Since</TableCell>
                        <TableCell className="infoValue" >{user.memberSince || "Not available"}</TableCell>
                    </TableRow>
                <TableRow>
                    <TableCell variant="head" className="infoLabel" >Email</TableCell>
                    <TableCell className="infoValue" >{_get(product, 'contactEmailAddressDisplayed') ? <a href={`mailto:${product?.contactEmail}`}>{product?.contactEmail}</a> || "Not available" : "Not available"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head" className="infoLabel">Contact</TableCell>
                    <TableCell className="infoValue" >{_get(product, 'contactNumberDisplayed') ? <a href={`tel:${product?.contactNumber}`}>{product?.contactNumber}</a> || "Not available" : "Not available"}</TableCell>
                </TableRow>
            </Table>

        </div>
      </div>
    );
  };
  return (
    <StyledViewProfile theme={useTheme()}>
      {renderSelection()}
    </StyledViewProfile>
  );
};

const StyledViewProfile = viewProfileStyle;
export const ViewProfilePublic = connect(
  viewProfileMapStateToProps,
  viewProfileMapDispatchToProps
)(ViewProfilePublicComponent);
