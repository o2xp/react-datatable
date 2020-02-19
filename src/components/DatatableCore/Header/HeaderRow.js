import React, { Component } from "react";
import { connect } from "react-redux";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import {
  columnsPropType,
  columnsOrderPropType,
  columnSizeMultiplierPropType,
  sortColumnsPropType,
  widthNumberPropType,
  CustomTableHeaderCellPropType,
  customPropsPropType
} from "../../../proptypes";
import HeaderCell from "./HeaderCell";
import HeaderActionsCell from "./HeaderActionsCell";
import { sortColumns as sortColumnsAction } from "../../../redux/actions/datatableActions";

export class HeaderRow extends Component {
  headerCellBuilder = (columnId, index) => {
    const {
      columns,
      CustomTableHeaderCell,
      columnSizeMultiplier,
      customProps
    } = this.props;
    const column = columns.find(col => col.id === columnId);
    const width = `${(
      (Number(column.colSize.split("px")[0]) + 35) *
      columnSizeMultiplier
    ).toString()}px`;
    const key = `column-${columnId}`;

    if (columnId === "o2xpActions") {
      return <HeaderActionsCell key={key} column={column} />;
    }

    if (CustomTableHeaderCell !== null) {
      return (
        <SortableItem
          key={key}
          index={index}
          width={width}
          value={
            <CustomTableHeaderCell
              customProps={customProps}
              column={column}
              width={width}
            />
          }
        />
      );
    }

    return <HeaderCell column={column} width={width} key={key} index={index} />;
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
          <div className="Table-Row">
            <SortableContainer
              onSortEnd={this.onSortEnd}
              axis="x"
              lockAxis="x"
              lockToContainerEdges
              helperClass="Table-Header-Cell-Draging-o2xp"
            >
              {columnsOrder.map((columnId, index) => {
                return this.headerCellBuilder(columnId, index);
              })}
            </SortableContainer>
          </div>
        </div>
      </div>
    );
  }
}

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const SortableItem = sortableElement(({ width, value }) => (
  <div className="Table-Header-Cell">
    <div style={{ width }}>{value}</div>
  </div>
));

HeaderRow.propTypes = {
  customProps: customPropsPropType,
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
    customProps: state.customComponentsReducer.customProps,
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
