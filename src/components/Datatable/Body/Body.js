// @flow
import React, { useRef, memo } from "react";
import memoize from "memoize-one";
import { FixedSizeList as List, areEqual } from "react-window";
import Row from "./Row";

type PropsType = {
  rowsData: Object[],
  columnsData: Object,
  width: number,
  updateRows: Object => void,
  editable: boolean,
  height: number,
  rowsActions: Object[],
  minWidth: number
};

const createItemData = memoize(
  (rowsData, columnsData, updateRows, editable, totalWidth, rowsActions) => ({
    rowsData,
    columnsData,
    updateRows,
    editable,
    totalWidth,
    rowsActions
  })
);

const row = memo(
  ({ index, style, data }: { index: number, style: Object, data: Object }) => {
    return <Row index={index} style={style} data={data} />;
  },
  areEqual
);

const Body = ({
  rowsData,
  columnsData,
  width,
  updateRows,
  editable,
  height,
  rowsActions,
  minWidth
}: PropsType) => {
  const realWidth = width - 17; // total width minus checkbox width minus YScrollBar width
  const listRef = useRef();
  const listHeight = height - 60; // total height minus header height minus scrollbar
  const itemData = createItemData(
    rowsData,
    columnsData,
    updateRows,
    editable,
    realWidth,
    rowsActions
  );

  return (
    <List
      {...{
        ref: listRef,
        height: listHeight,
        itemCount: rowsData.length,
        itemSize: columnsData.itemsHeight,
        width,
        itemData,
        style: { overflow: "scroll" }
      }}
    >
      {row}
    </List>
  );
};
const compareComp = (prevProps, nextProps) => {
  return !(
    prevProps.rowsData.length !== nextProps.rowsData.length ||
    prevProps.rowsData !== nextProps.rowsData ||
    prevProps.columnsData !== nextProps.columnsData ||
    prevProps.width !== nextProps.width ||
    prevProps.editable !== nextProps.editable ||
    prevProps.height !== nextProps.height ||
    prevProps.rowsActions !== nextProps.rowsActions
  );
};

export default memo<PropsType>(Body, compareComp);
