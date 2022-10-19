import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@material-ui/core";
import { slickMapDispatchToProps, slickMapStateToProps } from "../models";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import { globalConstants, updateFormStore } from "../../../utils";
import { Link } from "react-router-dom";
import { slickStyle } from "../style";

function GodhanNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: 0, zIndex: 3 }}
            onClick={onClick}
        />
    );
}

function GodhanPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: 0, zIndex: 3 }}
            onClick={onClick}
        />
    );
}


export const SlickComponent = ({
    hotcategories,
    fetchProductList,
    fetchFilterOptions,
    homeForm,
}) => {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 12,
        prevArrow: <GodhanNextArrow />,
        nextArrow: <GodhanPrevArrow />,
        responsive: [
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 10,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    const handleClick = (category) => {
        updateFormStore({
            form: "homeForm",
            field: "listType",
            value: _get(category, "name"),
        });
        if (category.parent_id > 5) {
            updateFormStore({
                form: "homeForm",
                field: "thirdLayerCategory",
                value: category,
            });
            updateFormStore({
                form: "homeForm",
                field: "secondarySelectedParent",
                value: category.parent_id,
            });
        } else {
            updateFormStore({
                form: "homeForm",
                field: "secondarySelectedParent",
                value: category.id,
            });
        }
        updateFormStore({
            form: "homeForm",
            field: "selectedCategoryName",
            value: category.name,
        });
        fetchProductList({
            limit: globalConstants.paginationLimit,
            offset: 0,
            payload: {
                listType: _get(category, "name", "default"),
                // keyword: _get(homeForm, 'searchField.value', null),
                latitude: _get(homeForm, "latitude.value", null),
                longitude: _get(homeForm, "longitude.value", null),
                radius: _get(homeForm, "radius.value") === 0 ? _get(homeForm, "radius.value") : 5000,
                categoryId: _get(category, "id"),
            },
        });
        fetchFilterOptions({
            listType: _get(category, "name"),
            isHot: true,
            categoryId: _get(category, "id"),
        });
    };

    return (
        <>
            <StyledSlick style={{ marginTop: 6 }} theme={useTheme()}>
                {hotcategories.length !== 0 && (
                    <div style={{ marginBottom: 6, marginTop: 0 }} className="heading">
                        Available Categories
                </div>
                )}
                {!_isEmpty(hotcategories) && (
                    <Slider {...settings}>
                        {hotcategories.map((category, key) => {
                            return (
                                <Link onClick={() => handleClick(category)} to="search">
                                    <div className="item" id={key} key={key}>
                                        <img
                                            className="image"
                                            src={_get(category, "image_url")}
                                            alt={_get(category, "name")}
                                        />
                                        <div className="category-name">
                                            {_get(category, "name")}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </Slider>
                )}
            </StyledSlick>
        </>
    );
};
const StyledSlick = slickStyle;

export const Slick = connect(
    slickMapStateToProps,
    slickMapDispatchToProps
)(SlickComponent);
