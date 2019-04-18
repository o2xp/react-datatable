import React from "react";
import {
  rowPropType,
  columnsOrderPropType,
  indexPropType,
  heightPropType,
  columnSizeMultiplierPropType
} from "../src/proptypes";
import { simpleOptionsSample } from "./samples";

const customTableBodyRowSample = ({
  row,
  columnsOrder,
  rowIndex,
  columnSizeMultiplier,
  height
}) => {
  const { columns } = simpleOptionsSample.data;
  return (
    <div
      className="Table-Row"
      style={{
        height,
        background: rowIndex % 2 === 0 ? "#3f3f3f" : "#5f5f5f"
      }}
    >
      {columnsOrder.map(columnId => {
        const column = columns.find(col => col.id === columnId);
        const width = `${(
          column.colSize.split("px")[0] * columnSizeMultiplier
        ).toString()}px`;
        return (
          <div className="Table-Cell" key={columnId}>
            <div style={{ color: "pink", width }}>{row[columnId]}</div>
          </div>
        );
      })}
    </div>
  );
};

customTableBodyRowSample.propTypes = {
  row: rowPropType,
  columnsOrder: columnsOrderPropType,
  rowIndex: indexPropType,
  height: heightPropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
};

export default customTableBodyRowSample;
