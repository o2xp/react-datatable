// @flow
import React, { useMemo, useCallback } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import Checkbox from "@material-ui/core/Checkbox";
import HeaderCell from "./HeaderCell";

const Header = ({
  columnsData,
  updateColumnsOrder,
  sortFunction,
  sortingOptions,
  width,
  checkedAll,
  toggleCheckedAll,
  rowsActions,
  minWidth
}: {
  columnsData: Object,
  updateColumnsOrder: Object => void,
  sortFunction: Object => void,
  sortingOptions: Object,
  width: number,
  checkedAll: Object,
  toggleCheckedAll: () => void,
  rowsActions: Object[],
  minWidth: number
}) => {
  const { columnsOrder, columns } = columnsData;
  const columnsToDisplay = useMemo(() => columnsOrder.map(colId => columns[colId]), [
    columnsOrder,
    columns
  ]); // if columns is not in columnsOrder, it won't be displayed
  const effectiveWidth = (minWidth > width ? minWidth : width) - 17;
  const realWidth = effectiveWidth - 36 - rowsActions.length * 36; // dataTable width minus checkAll checkbox width minus actions icons width

  const SortableItem = sortableElement(({ col }) => {
    const index = sortingOptions.columns.findIndex(el => el === col.id);
    const order = {
      order: index === -1 ? "" : sortingOptions.order[index],
      position: index + 1
    };
    return (
      <HeaderCell
        column={col}
        sortFunction={sortFunction}
        sortingOrder={order}
        totalWidth={realWidth}
      />
    );
  });

  const SortableContainer = sortableContainer(({ children }) => {
    return <div className="sortableContainer">{children}</div>;
  });

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const newColumnsOrder = [...columnsOrder];
      const toMove = columnsOrder[oldIndex];
      newColumnsOrder.splice(oldIndex, 1);
      newColumnsOrder.splice(newIndex, 0, toMove);
      updateColumnsOrder(newColumnsOrder);
    },
    [columnsOrder, updateColumnsOrder]
  );
  return (
    <div className="header" style={{ width: width - 17 }}>
      <div
        className="actionsTitle"
        style={{
          width: 36 + rowsActions.length * 36,
          minWidth: 36 + rowsActions.length * 36
        }}
      >
        <div className="checkboxContainer" />
        <Checkbox
          className="checkAll"
          checked={checkedAll.all || checkedAll.oneOrMore}
          indeterminate={checkedAll.oneOrMore && !checkedAll.all}
          color="primary"
          onChange={toggleCheckedAll}
        />
      </div>
      <SortableContainer
        axis="x"
        lockAxis="x"
        lockToContainerEdges
        onSortEnd={onSortEnd}
        transitionDuration={300}
        helperClass="SortableHelper"
        useDragHandle
      >
        {columnsToDisplay.map((column, index) => {
          return <SortableItem key={column.id} col={column} index={index} />;
        })}
      </SortableContainer>
    </div>
  );
};

export default Header;
