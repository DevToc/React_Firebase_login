/* eslint-disable */
import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _includes from "lodash/includes";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { mainProductWidgetMapDispatchToProps, mainProductWidgetMapStateToProps, } from "./models";
import { isPlatform } from '@ionic/react';
import { BackButtonComponent, ImageCarouselComponent } from "./components";
import { Avatar, Button, Grid, IconButton } from "@material-ui/core";
import { formConstants } from "./utils/ProductViewConstants";
import { LoaderComponent, ModalComponent, SocialSharingComponent, } from "../../components";
import { ProductFeatures } from "./utils";
import { globalConstants, globalUtils, updateFormStore } from "../../utils";
import { mainProductStyle } from "./style";
import StarIcon from "../../assets/icons/star";
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardIos";
import TextArea from "../../components/text-area/TextArea";
import { editableStatuses } from "./utils/ProductView.props";


const MainProduct = (props) => {
    const {
        getProduct,
        userDetails,
        fetchUserDetails,
        setFormData,
        clearProduct,
        product,
        loader,
        chatStatus,
        clearInterest,
        fetchFavouriteIds,
        isAuthorized,
        userMessage,
        clearCurrentLocation,
        updateFavoriteStatus,
        favouriteItemIds,
        productForm,
        setCurrentConversation,
        expressInterest,
    } = props;
    const [open, setOpen] = useState(false);
    const [sendMessageOpen, setSendMessageOpen] = useState(false);

    const history = useHistory();

    const [carouselDimensions, setCarouselDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleFavorite = (product) => {
        if (!globalUtils.isTokenAvailable()) {
            history.push("/login")
            return;
        }
        updateFavoriteStatus({
            ...product,
            isFavourite: !_includes(
                favouriteItemIds,
                _get(product, "productID", _get(product, "wantedID"))
            ),
        });
    };

    const getRentDuration = () => {
        const rentDuration =
            _get(product, "additionalFeatures.length") > 0 &&
            _get(product, "additionalFeatures").find(
                (val) => val.key === "rentDuration"
            );
        if (!_isEmpty(rentDuration)) {
            if (rentDuration.value.startsWith("1")) {
                return rentDuration.value.split(" ")[1];
            }
            return rentDuration.value;
        }
    };

    useEffect(() => {
        clearProduct();
        sessionStorage.setItem("godhan-flow", "view-product");
        setFormData(formConstants);
        getProduct({ id: getProductId() });
        if (globalUtils.isTokenAvailable()) {
            fetchFavouriteIds();
        }
        if (_isEmpty(userDetails) && globalUtils.isTokenAvailable()) {
            fetchUserDetails();
        }
        return () => {
            clearCurrentLocation();
            if (globalUtils.getSessionStorageItem() === 'edit-profile')
                sessionStorage.removeItem("godhan-flow");
        };
    }, []);

    useEffect(() => {
        if (chatStatus || (!_isEmpty(userMessage) && !!userMessage)) {
            setOpen(true);
        }
    }, [chatStatus, userMessage]);

    const getProductId = () => {
        const temp = window.location.pathname.split("/");
        const object = temp[temp.length - 1];
        return object;
    };

    const handleCloseClick = () => {
        clearInterest();
        updateFormStore({
            form: "productListingForm",
            field: "userMessage",
            value: "",
        });
    };

    const handleAmountChange = (e) => {
        const { value, name } = e.target;
        updateFormStore({ form: "productListingForm", field: name, value });
    };

    const handleInterest = () => {
        setCurrentConversation(_get(product, "productId"));
        if (String(userDetails.id) === String(_get(product, "userID"))) {
            return updateFormStore({
                form: "productListingForm",
                field: "userMessage",
                value: "You cannot bid on a product you listed",
            });
        }
        updateFormStore({
            form: "productListingForm",
            field: "userMessage",
            value: null,
        });
        expressInterest({
            currentUser: String(userDetails.id),
            currentUserName: userDetails.name,
            listedBy: _get(product, "userName"),
            id: String(_get(product, "productID")),
            title: _get(product, "productTitle"),
            sellerId: String(_get(product, "userID")),
            isInitiateChat: true,
            image: _get(product, "imageURL[0]"),
            amount: globalUtils.isNumeric(_get(productForm, "bidAmount.value"))
                ? `${globalUtils.getCountryProperty("currency"), userDetails?.countryCode} ${_get(
                    productForm,
                    "bidAmount.value"
                )}`
                : _get(productForm, "bidAmount.value"),
        });
        updateFormStore({
            form: "productListingForm",
            field: "bidAmount",
            value: "",
        });
        setSendMessageOpen(false);
    };

    const handleLocationClick = () => {
        let url = 'https://www.google.com/maps/search/?api=1&query=';
        if (isPlatform('ios')) {
            url = `http://maps.apple.com/?ll=`
        }
        url += `${_get(product, "latitude")},${_get(product, "longitude")}`;
        window.location = url;
    }

    return (
        <>
            <StyledProducts>
                <Grid container className="parent-container">
                    <Grid
                        style={{ position: "sticky", zIndex: 10, width: "100%" }}
                        item
                        xs={12}
                        className="header"
                    >
                        <ImageCarouselComponent
                            onChangeDimensions={(dimensions) => {
                                if (dimensions.height !== carouselDimensions.height)
                                    setCarouselDimensions(dimensions);
                            }}
                        />
                        <BackButtonComponent
                            style={{ position: "absolute", top: 11, left: 16, zIndex: 1 }}
                        />
                        {String(_get(userDetails, "id")) !==
                            String(_get(product, "userID")) && (
                                <>
                                    <IconButton
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 38,
                                            zIndex: 1,
                                        }}
                                        onClick={() => handleFavorite(product)}
                                    >
                                        <StarIcon
                                            style={{
                                                height: 20,
                                                width: 20,
                                            }}
                                            stroke="#8c450b"
                                            fill={
                                                _includes(
                                                    favouriteItemIds,
                                                    _get(product, "productID", _get(product, "wantedID"))
                                                )
                                                    ? "#8c450b"
                                                    : "white"
                                            }
                                        />
                                    </IconButton>
                                </>
                            )}
                        <SocialSharingComponent
                            url={`${globalUtils.getCountryProperty("uiUrl", userDetails?.countryCode)}/product/${_get(
                                product,
                                "productID",
                                _get(product, "wantedID")
                            )}`}
                            style={{ position: "absolute", top: 5, right: 5, minWidth: 40 }}
                        />
                    </Grid>
                    <div
                        style={{
                            paddingLeft: 17,
                            width: "100%",
                            paddingBottom: 100,
                            overflow: 'hidden'
                            // paddingTop: carouselDimensions.height,
                        }}
                    >
                        <Grid item xs={12}>
                            <h1
                                style={{ marginTop: 7, fontWeight: 600, marginBottom: 16 }}
                                className="heading"
                            >
                                {_get(product, "productTitle", "Not available")}
                            </h1>
                        </Grid>
                        <Grid
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: 9,
                            }}
                            item
                            xs={12}
                        >
                            <div className="price">
                                <span style={{ fontSize: 19 }}>
                                    {globalUtils.getCountryProperty("currency", userDetails?.countryCode)}
                                </span>
                                {globalUtils.getFormattedPrice(_get(product, "listedPrice"))}
                                {_get(product, "type") === "rent" && "/"}
                                <span style={{ fontWeight: 500 }}>
                                    {_get(product, "type") === "rent" && getRentDuration()}
                                </span>
                            </div>
                            <span className="location">
                                <span onClick={handleLocationClick}>{_get(product, "listedLocation")}</span>

                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                to={`/profile?id=${product.productID}`}
                                className="userInfo"
                            >
                                <Avatar className="avatar" src={_get(product, "profileImg")} />
                                <div className="info">
                                    <div className="name">{_get(product, "userName")}</div>
                                    {globalUtils.isTokenAvailable() && <div className="contact ellipsis">
                                        {_get(product, "contactEmailAddressDisplayed") ? _get(product, "contactEmail") : ''}
                                    </div>}
                                </div>
                                <ArrowForwardIcon
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: 20,
                                        color: "#001D48",
                                        fontSize: '18px'
                                    }}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="categoryInfo">
                                <p>{_get(product, "type", "Unavailable")}
                                    {
                                        _get(product, 'categoryTree', []).map((ele, index) => (
                                            <span id={index} key={index}> > {
                                                ele?.name
                                            }
                                            </span>
                                        ))
                                    }
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <h2 className="heading-sm">Description</h2>
                            <p style={{ color: "rgba(0, 0, 0, 0.76)" }} className="text-small">
                                {_get(product, "productDescription", "Unavailable")}
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="left-pane">
                                <ProductFeatures product={product} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="timeInfo">
                                <p>Created On: {globalUtils.getFormattedDate(
                                    _get(product, "listedOn"),
                                    "YYYY-MM-DDThh:mm:ss:000Z"
                                )}</p>
                                <p>Updated On: {globalUtils.getFormattedDate(
                                    _get(product, "updateOn"),
                                    "YYYY-MM-DDThh:mm:ss:000Z"
                                )}</p>
                            </div>
                        </Grid>
                    </div>
                </Grid>
                {
                    String(_get(userDetails, "id")) !==
                    String(_get(product, "userID")) && <Grid container style={{ position: "fixed" }} className="footer">
                        <Grid
                            onClick={() =>
                                globalUtils.isTokenAvailable()
                                    ? setSendMessageOpen(true)
                                    : history.push("/login")
                            }
                            item
                            xs={product.contactNumber && product.contactNumberDisplayed ? 6 : 12}
                            className={product.contactNumber && product.contactNumberDisplayed ? "tab" : "tabActive"}
                        >
                            Chat
                    </Grid>
                        {product.contactNumber && product.contactNumberDisplayed && (
                            <Grid item xs={6} className="tabActive">
                                {globalUtils.isTokenAvailable() ? (
                                    <a
                                        style={{ color: "white", display: "block", width: "100%" }}
                                        href={`tel:${product.contactNumber}`}
                                    >
                                        Call
                                </a>
                                ) : (
                                        <Link
                                            style={{ color: "white", display: "block", width: "100%" }}
                                            to="/login"
                                        >
                                            Call
                                </Link>
                                    )}
                            </Grid>
                        )}
                    </Grid>
                }
            </StyledProducts>

            <LoaderComponent loader={loader} />

            <ModalComponent
                open={sendMessageOpen}
                setOpen={setSendMessageOpen}
            //handleCloseClick={handleCloseClick}
            >
                <div
                    style={{
                        padding: "20px 10px",
                        width: "100%",
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <TextArea
                        name={_get(productForm, "bidAmount.name")}
                        placeholder={_get(productForm, "bidAmount.placeholder")}
                        value={_get(productForm, "bidAmount.value")}
                        onChange={handleAmountChange}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={handleInterest}
                        className="handleInterestIcon"
                        disabled={
                            !_includes(editableStatuses, _get(product, "listingStatus"))
                        }
                        key={`${!_includes(
                            editableStatuses,
                            _get(product, "listingStatus")
                        )}`}
                    >
                        Send Message
                    </Button>
                </div>
            </ModalComponent>

            <ModalComponent
                open={open}
                setOpen={setOpen}
                message={
                    userMessage || (userMessage == null && globalConstants.messageSent)
                }
                handleCloseClick={handleCloseClick}
            />
        </>
    );
};

const StyledProducts = mainProductStyle;

export const MainProductWidget = connect(
    mainProductWidgetMapStateToProps,
    mainProductWidgetMapDispatchToProps
)(MainProduct);
