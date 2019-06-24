import React, { Fragment } from "react";
import { ScrollSyncPane } from "react-scroll-sync";
import { PulseLoader } from "react-spinners";
import {
  heightNumberPropType,
  widthNumberPropType,
  columnSizeMultiplierPropType
} from "../proptypes";

const Loader = props => {
  const { height, width, columnSizeMultiplier, totalWidthNumber } = props;

  return (
    <Fragment>
      <div id="loader" style={{ height: height - 15, width: width - 15 }}>
        <PulseLoader sizeUnit="px" size={15} color="#3f51b5" loading />
      </div>
      <ScrollSyncPane>
        <div
          style={{
            overflowX: columnSizeMultiplier === 1 ? "scroll" : "hidden",
            overflowY: "hidden",
            height: "15px",
            width: width - 15
          }}
        >
          <div
            style={{
              width: totalWidthNumber
            }}
          >
            .
          </div>
        </div>
      </ScrollSyncPane>
    </Fragment>
  );
};

Loader.propTypes = {
  height: heightNumberPropType.isRequired,
  width: widthNumberPropType.isRequired,
  totalWidthNumber: widthNumberPropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
};

export default Loader;
