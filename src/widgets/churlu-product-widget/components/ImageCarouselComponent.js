import React, { useState, useRef, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import {
  imageCarouselMapStateToProps,
  imageCarouselMapDispatchToProps,
} from "../models";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import GodhanLightbox from "../../../components/LightBox";


const ImageCarousel = ({ product, onChangeDimensions }) => {
  const [isLightboxOpen, setLightBoxOpen] = useState(false);
  const [indexElement, setIndexElement] = useState(0);

  const ref = useRef(null);


  const changeDimensions = useCallback(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      onChangeDimensions({
        width: Math.round(width),
        height: Math.round(height),
      });
    }
  }, [ref, onChangeDimensions]);

  useEffect(() => {
    changeDimensions();
  }, [ref, changeDimensions]);

  const toggleLightbox = (index) => { if (index) setIndexElement(index); setLightBoxOpen(!isLightboxOpen) }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <Carousel
        showThumbs={false}
        showIndicators={true}
        emulateTouch
        showStatus={false}
        autoPlay={false}
        showArrows={false}
        onChange={changeDimensions}
        onClickItem={toggleLightbox}
      >
        {product.imageURL?.length > 0 ? (
          _get(product, "imageURL").map((item, i) => (
            <img
              src={item}
              color="primary"
              alt=""
              key={i}
              style={{
                maxHeight: 340,
                objectFit: "contain",
              }}
            />
          ))
        ) : (
            <img
              src="/assets/images/logo.png"
              color="primary"
              alt=""
              style={{
                maxHeight: 340,
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
          )}
      </Carousel>
      {product.imageURL?.length > 0 && <GodhanLightbox
        images={product.imageURL}
        isLightboxOpen={isLightboxOpen}
        toggleLightbox={toggleLightbox}
        indexElement={indexElement}
      /> }
    </div>
  );
};

export const ImageCarouselComponent = connect(
  imageCarouselMapStateToProps,
  imageCarouselMapDispatchToProps
)(ImageCarousel);
