import React, { Component, Fragment } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import { FixedSizeList } from "react-window";
import { throttle } from "lodash";
import BodyRow from "./BodyRow";
import { setIsScrolling as setIsScrollingAction } from "../../../redux/actions/datatableActions";
import {
  rowsPropType,
  CustomTableBodyRowPropType,
  columnsOrderPropType,
  dimensionsPropType,
  strippedPropType,
  setIsScrollingPropType,
  isScrollingPropType,
  keyColumnPropType,
  rowsEditedPropType,
  heightNumberPropType,
  widthNumberPropType,
  columnSizeMultiplierPropType,
  customPropsPropType
} from "../../../proptypes";

export const tableRef = React.createRef();
export class Body extends Component {
  componentDidMount() {
    const virtualizedContainer = findDOMNode(tableRef.current);
    const callBack = () =>
      throttle(() => this.handleScroll(virtualizedContainer.scrollLeft), 500);
    if (virtualizedContainer) {
      virtualizedContainer.addEventListener("scroll", callBack());
    }
  }

  componentWillUnmount() {
    const { rows } = this.props;
    if (rows.length > 0 && tableRef && tableRef.current) {
      findDOMNode(tableRef.current).removeEventListener("scroll", null);
    }
  }

  handleScroll = scrollLeft => {
    const { setIsScrolling, isScrolling } = this.props;
    const bool = scrollLeft > 0;
    if (bool !== isScrolling) {
      setIsScrolling(bool);
    }
  };

  rowBuilder = ({ index, style }) => {
    const {
      CustomTableBodyRow,
      rows,
      dimensions,
      columnsOrder,
      keyColumn,
      stripped,
      rowsEdited,
      customProps
    } = this.props;
    const key = `row-${index}`;
    const { columnSizeMultiplier } = dimensions;
    let row = rows[index];
    row = rowsEdited.find(r => r[keyColumn] === row[keyColumn]) || row;
    const editing =
      rowsEdited.find(r => r[keyColumn] === row[keyColumn]) !== undefined;
    const newStyle = {
      ...style,
      backgroundColor:
        stripped && index % 2 === 0 ? "rgba(228, 228, 228, 1)" : "white"
    };

    if (CustomTableBodyRow !== null) {
      return (
        <div
          style={{
            top: newStyle.top,
            height: newStyle.height,
            position: newStyle.position,
            borderBottom: "1px solid rgba(224, 224, 244, 1)"
          }}
        >
          <CustomTableBodyRow
            customProps={customProps}
            row={row}
            columnsOrder={columnsOrder}
            rowIndex={index}
            height={newStyle.height}
            columnSizeMultiplier={columnSizeMultiplier}
            key={key}
          />
        </div>
      );
    }

    return <BodyRow row={row} editing={editing} style={newStyle} key={key} />;
  };

  render() {
    const {
      rows,
      dimensions,
      columnsOrder,
      rowsEdited,
      height,
      width,
      totalWidthNumber,
      columnSizeMultiplier
    } = this.props;

    return (
      <Fragment>
        {rows.length > 0 && (
          <div className="Table-Body">
            <ScrollSyncPane>
              <FixedSizeList
                ref={tableRef}
                className="virtualized-container"
                height={dimensions.body.heightNumber}
                itemCount={rows.length}
                itemSize={dimensions.row.heightNumber}
                width={dimensions.datatable.widthNumber}
                columnsOrder={columnsOrder}
                rowsEdited={rowsEdited}
                rows={rows}
                style={{ overflowX: "auto", overflowY: "scroll" }}
              >
                {this.rowBuilder}
              </FixedSizeList>
            </ScrollSyncPane>
          </div>
        )}

        {rows.length === 0 && (
          <Fragment>
            <div
              id="no-rows-filtered"
              style={{
                height: height - 15,
                width: width - 15
              }}
            >
              There is no result for your search
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
        )}
      </Fragment>
    );
  }
}

Body.propTypes = {
  rows: rowsPropType.isRequired,
  customProps: customPropsPropType,
  columnsOrder: columnsOrderPropType.isRequired,
  dimensions: dimensionsPropType.isRequired,
  CustomTableBodyRow: CustomTableBodyRowPropType,
  setIsScrolling: setIsScrollingPropType,
  isScrolling: isScrollingPropType.isRequired,
  stripped: strippedPropType.isRequired,
  keyColumn: keyColumnPropType.isRequired,
  rowsEdited: rowsEditedPropType.isRequired,
  height: heightNumberPropType.isRequired,
  width: widthNumberPropType.isRequired,
  totalWidthNumber: widthNumberPropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setIsScrolling: bool => dispatch(setIsScrollingAction(bool))
  };
};

const mapStateToProps = state => {
  return {
    customProps: state.customComponentsReducer.customProps,
    rows: state.datatableReducer.pagination.rowsCurrentPage,
    dimensions: state.datatableReducer.dimensions,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    rowsEdited: state.datatableReducer.rowsEdited,
    height: state.datatableReducer.dimensions.body.heightNumber,
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    keyColumn: state.datatableReducer.keyColumn,
    isScrolling: state.datatableReducer.dimensions.isScrolling,
    stripped: state.datatableReducer.stripped,
    totalWidthNumber:
      state.datatableReducer.dimensions.datatable.totalWidthNumber,
    columnSizeMultiplier:
      state.datatableReducer.dimensions.columnSizeMultiplier,
    CustomTableBodyRow: state.customComponentsReducer.CustomTableBodyRow
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
