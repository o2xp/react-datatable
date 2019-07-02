import React from "react";
import {
  rowPropType,
  columnsOrderPropType,
  indexPropType,
  heightNumberPropType,
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
  const columnAction = {
    id: "o2xpActions",
    label: "Actions",
    colSize: "150px",
    editable: false
  };
  return (
    <div
      className={
        rowIndex % 2 === 0 ? "Table-Row stripped" : "Table-Row not-stripped"
      }
      style={{
        height
      }}
    >
      {columnsOrder.map(columnId => {
        const column =
          columnId === "o2xpActions"
            ? columnAction
            : columns.find(col => col.id === columnId);
        const width = `${(
          column.colSize.split("px")[0] * columnSizeMultiplier
        ).toString()}px`;
        return (
          <div
            className="Table-Cell"
            style={{
              background: rowIndex % 2 === 0 ? "#3f3f3f" : "#5f5f5f"
            }}
            key={columnId}
          >
            <div
              style={{
                color: "pink",
                width
              }}
            >
              {row[columnId]}
            </div>
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
  height: heightNumberPropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
};

export default customTableBodyRowSample;
