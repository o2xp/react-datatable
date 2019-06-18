import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import Header from "./DatatableCore/Header/Header";
import Body from "./DatatableCore/Body/Body";
import DatatableHeader from "./DatatableHeader/DatatableHeader";
import DatatableFooter from "./DatatableFooter/DatatableFooter";
import SnackbarCopy from "./SnackbarCopy";
import {
  dataPropType,
  heightNumberPropType,
  widthNumberPropType,
  featuresPropType,
  titlePropType,
  columnSizeMultiplierPropType
} from "../proptypes";

class DatatableContainer extends Component {
  render() {
    const {
      data,
      height,
      columnSizeMultiplier,
      width,
      features,
      title,
      totalWidthNumber
    } = this.props;

    const { canSelectRow, canDownload, canSearch } = features;
    const hasHeader = title !== "" || canSelectRow || canDownload || canSearch;

    return (
      <Fragment>
        <ScrollSync>
          <div id="o2xp" style={{ width }}>
            {hasHeader && <DatatableHeader />}

            <div className="Table">
              {data.columns.length > 0 && (
                <Fragment>
                  <Header />
                  {data.rows.length > 0 && <Body />}
                </Fragment>
              )}
              {(data.columns.length === 0 || data.rows.length === 0) && (
                <Fragment>
                  <div
                    id="no-rows"
                    style={{ height: height - 15, width: width - 15 }}
                  >
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
            <DatatableFooter />
          </div>
        </ScrollSync>
        <SnackbarCopy />
      </Fragment>
    );
  }
}

DatatableContainer.propTypes = {
  data: dataPropType.isRequired,
  height: heightNumberPropType.isRequired,
  width: widthNumberPropType.isRequired,
  totalWidthNumber: widthNumberPropType,
  features: featuresPropType,
  title: titlePropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
};

const mapStateToProps = state => {
  return {
    data: state.datatableReducer.data,
    height: state.datatableReducer.dimensions.body.heightNumber,
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    features: state.datatableReducer.features,
    title: state.datatableReducer.title,
    totalWidthNumber:
      state.datatableReducer.dimensions.datatable.totalWidthNumber,
    columnSizeMultiplier: state.datatableReducer.dimensions.columnSizeMultiplier
  };
};

export default connect(mapStateToProps)(DatatableContainer);
