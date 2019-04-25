import React, { Component } from "react";
import { connect } from "react-redux";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import {
  columnsPropType,
  columnsOrderPropType,
  columnSizeMultiplierPropType,
  sortColumnsPropType,
  widthNumberPropType,
  CustomTableHeaderCellPropType
} from "../../../proptypes";
import HeaderCell from "./HeaderCell";
import { sortColumns as sortColumnsAction } from "../../../redux/actions/datatableActions";

export class HeaderRow extends Component {
  headerCellBuilder = (columnId, index) => {
    const { columns, CustomTableHeaderCell, columnSizeMultiplier } = this.props;
    const column = columns.find(col => col.id === columnId);
    const width = `${(
      column.colSize.split("px")[0] * columnSizeMultiplier
    ).toString()}px`;

    if (CustomTableHeaderCell !== null) {
      return (
        <SortableItem
          key={columnId}
          index={index}
          width={width}
          value={<CustomTableHeaderCell column={column} width={width} />}
        />
      );
    }

    return (
      <HeaderCell column={column} width={width} key={columnId} index={index} />
    );
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { sortColumns } = this.props;
    sortColumns(oldIndex, newIndex);
  };

  render() {
    const { columnsOrder, widthDatatable } = this.props;
    return (
      <div
        style={{
          width: widthDatatable - 17,
          overflowX: "hidden",
          borderBottom: "1px solid #7e7e7e"
        }}
      >
        <div className="Table-Header">
          <SortableContainer
            onSortEnd={this.onSortEnd}
            axis="x"
            lockAxis="x"
            lockToContainerEdges
            helperClass="Table-Header-Cell-Draging"
          >
            {columnsOrder.map((columnId, index) => {
              return this.headerCellBuilder(columnId, index);
            })}
          </SortableContainer>
        </div>
      </div>
    );
  }
}

const SortableContainer = sortableContainer(({ children }) => {
  return <div className="Table-Row">{children}</div>;
});

const SortableItem = sortableElement(({ width, value }) => (
  <div className="Table-Header-Cell">
    <div style={{ width }}>{value}</div>
  </div>
));

HeaderRow.propTypes = {
  columns: columnsPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  columnSizeMultiplier: columnSizeMultiplierPropType.isRequired,
  sortColumns: sortColumnsPropType,
  widthDatatable: widthNumberPropType.isRequired,
  CustomTableHeaderCell: CustomTableHeaderCellPropType
};

const mapDispatchToProps = dispatch => {
  return {
    sortColumns: (oldIndex, newIndex) =>
      dispatch(sortColumnsAction({ oldIndex, newIndex }))
  };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderRow);
