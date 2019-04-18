import React, { Component } from "react";
import { connect } from "react-redux";
import {
  columnsPropType,
  columnsOrderPropType,
  columnSizeMultiplierPropType,
  widthNumberPropType,
  CustomTableHeaderCellPropType
} from "../../../proptypes";
import HeaderCell from "./HeaderCell";

class HeaderRow extends Component {
  headerCellBuilder = columnId => {
    const { columns, CustomTableHeaderCell, columnSizeMultiplier } = this.props;
    const column = columns.find(col => col.id === columnId);
    const width = `${(
      column.colSize.split("px")[0] * columnSizeMultiplier
    ).toString()}px`;

    if (CustomTableHeaderCell !== null) {
      return (
        <div className="Table-Header-Cell" key={columnId}>
          <div style={{ width }}>
            <CustomTableHeaderCell column={column} width={width} />
          </div>
        </div>
      );
    }

    return <HeaderCell column={column} width={width} key={columnId} />;
  };

  render() {
    const { columnsOrder, widthDatatable } = this.props;
    return (
      <div style={{ width: widthDatatable - 17, overflow: "hidden" }}>
        <div className="Table-Header">
          <div className="Table-Row">
            {columnsOrder.map(columnId => {
              return this.headerCellBuilder(columnId);
            })}
          </div>
        </div>
      </div>
    );
  }
}

HeaderRow.propTypes = {
  columns: columnsPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  columnSizeMultiplier: columnSizeMultiplierPropType.isRequired,
  widthDatatable: widthNumberPropType.isRequired,
  CustomTableHeaderCell: CustomTableHeaderCellPropType
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    widthDatatable: state.datatableReducer.dimensions.datatable.widthNumber,
    columnSizeMultiplier:
      state.datatableReducer.dimensions.columnSizeMultiplier,
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    CustomTableHeaderCell: state.customComponentsReducer.CustomTableHeaderCell
  };
};

export default connect(mapStateToProps)(HeaderRow);
