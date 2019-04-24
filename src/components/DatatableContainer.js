import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import Header from "./DatatableCore/Header/Header";
import Body from "./DatatableCore/Body/Body";
import {
  dataPropType,
  heightNumberPropType,
  widthNumberPropType,
  columnSizeMultiplierPropType
} from "../proptypes";

class DatatableContainer extends Component {
  render() {
    const {
      data,
      height,
      columnSizeMultiplier,
      width,
      totalWidthNumber
    } = this.props;

    return (
      <ScrollSync>
        <Fragment>
          <div className="Table">
            {data.columns.length > 0 && (
              <Fragment>
                <Header />
                {data.rows.length > 0 && <Body />}
              </Fragment>
            )}
            {(data.columns.length === 0 || data.rows.length === 0) && (
              <Fragment>
                <div id="no-rows" style={{ height, width: width - 15 }}>
                  There is no data yet, try to refresh <span> .</span>
                  <span>.</span>
                  <span>.</span>
                </div>
                <ScrollSyncPane>
                  <div
                    style={{
                      overflowX:
                        columnSizeMultiplier === 1 ? "scroll" : "hidden",
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
            )}
          </div>
        </Fragment>
      </ScrollSync>
    );
  }
}

DatatableContainer.propTypes = {
  data: dataPropType.isRequired,
  height: heightNumberPropType.isRequired,
  width: widthNumberPropType.isRequired,
  totalWidthNumber: widthNumberPropType.isRequired,
  columnSizeMultiplier: columnSizeMultiplierPropType.isRequired
};

const mapStateToProps = state => {
  return {
    data: state.datatableReducer.data,
    height: state.datatableReducer.dimensions.body.heightNumber,
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    totalWidthNumber:
      state.datatableReducer.dimensions.datatable.totalWidthNumber,
    columnSizeMultiplier: state.datatableReducer.dimensions.columnSizeMultiplier
  };
};

export default connect(mapStateToProps)(DatatableContainer);
