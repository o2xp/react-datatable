// @flow
import React from "react";
import { sortableHandle } from "react-sortable-hoc";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import HeaderSorter from "./HeaderSorter";

const HeaderCell = ({
  column,
  sortFunction,
  sortingOrder,
  totalWidth
}: {
  column: any,
  sortFunction: Object => void,
  sortingOrder: any,
  totalWidth: any
}) => {
  const { totalWidthRatio = 0, label, colSize } = column;
  const theme = useTheme();

  const orderBy = () => {
    sortFunction(column);
  };

  const DragHandle = sortableHandle(() => {
    return (
      <div className="dragLineBox">
        <hr
          className="dragLine"
          style={theme.dragLineColor && { borderColor: theme.dragLineColor }}
        />
      </div>
    );
  });

  return (
    <div
      className="columnTitle"
      style={{
        width: totalWidth > 0 ? totalWidth * totalWidthRatio - 4 : colSize - 4,
        minWidth: colSize - 4
      }}
    >
      <DragHandle />
      <div className="title">
        <Typography variant="subtitle1">{label}</Typography>

        <HeaderSorter sortingInfos={sortingOrder} orderBy={orderBy} />
      </div>
    </div>
  );
};
export default HeaderCell;
