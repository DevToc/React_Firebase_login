import React from "react";
import { connect } from "react-redux";
import { showMoreMapStateToProps, showMoreMapDispatchToProps } from "../models";
import { Button } from "@material-ui/core";
import { globalConstants } from "../../../utils";

const ShowMore = (props) => {
  const {
    totalElements,
    offset,
    fetchProductList,
    listType,
    totalSize,
    style,
  } = props;

  const handleClick = () => {
    fetchProductList({
      listType,
      offset: offset + 1,
      limit: globalConstants.paginationLimit,
    });
  };

  return (
    totalElements > totalSize && (
      <>
        <div className="show-more-component" id="show-more-home">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            aria-label="show-more"
            disableElevation
            onClick={handleClick}
            style={style}
          >
            Show more
          </Button>
        </div>
      </>
    )
  );
};

export const ShowMoreComponent = connect(
  showMoreMapStateToProps,
  showMoreMapDispatchToProps
)(ShowMore);
