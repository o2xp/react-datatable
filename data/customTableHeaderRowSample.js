import React from "react";
import {
  columnsOrderPropType,
  columnSizeMultiplierPropType
} from "../src/proptypes";
import { simpleOptionsSample } from "./samples";

const customTableHeaderRowSample = ({ columnsOrder, columnSizeMultiplier }) => {
  const { columns } = simpleOptionsSample.data;
  const columnAction = {
    id: "o2xpActions",
    label: "Actions",
    colSize: "150px",
    editable: false
  };
  return (
    <div className="Table-Row">
      {columnsOrder.map(columnId => {
        const column =
          columnId === "o2xpActions"
            ? columnAction
            : columns.find(col => col.id === columnId);
        const width = `${(
          column.colSize.split("px")[0] * columnSizeMultiplier
        ).toString()}px`;
        return (
          <div className="Table-Header-Cell" key={column.id}>
            <div style={{ color: "green", width }}>{column.label}</div>
          </div>
        );
      })}
    </div>
  );
};

customTableHeaderRowSample.propTypes = {
  columnsOrder: columnsOrderPropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
};

export default customTableHeaderRowSample;
