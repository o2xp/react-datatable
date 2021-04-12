// @flow
import React from "react";
import { v4 as uuid } from "uuid";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import RowCell from "./RowCell";
import InputCell from "./InputCell";

const Row = ({ index, style, data }: { index: number, style: Object, data: Object }) => {
  const {
    rowsData,
    columnsData,
    updateRows,
    editable,
    totalWidth,
    rowsActions,
    effectiveWidth
  } = data;
  const {
    columns,
    columnsOrder,
    itemsHeight,
    borderedColumns = false,
    borderedRows = false
  } = columnsData;
  const rowData = rowsData[index];
  const { id, checked = false } = rowData;
  const [value, setValue] = React.useState(0); // state used to force rerender

  const positions = { start: "flex-start", center: "center", end: "flex-end" };

  // update the state to force render
  const forceUpdate = () => {
    setValue(value => ++value);
  };

  const handleCheck = event => {
    rowsData[index].checked = event.target.checked;
    forceUpdate();
    updateRows();
  };

  const updateCell = (columnId, rowId, newValue) => {
    rowData[columnId] = newValue; // mutation because edit is to slow if immutable /!\ need to notify parents when a change is done if needed
  };

  return (
    <div
      className={`row${checked ? " checked" : ""}${index % 2 === 0 ? " stripped" : ""}${
        borderedRows ? " bordered" : ""
      }`}
      style={{
        ...style,
        width: effectiveWidth
      }}
      key={id}
    >
      <div
        className="rowCheckboxContainer"
        style={{
          height: itemsHeight
        }}
      >
        <Checkbox
          checked={checked}
          color="primary"
          onChange={handleCheck}
          style={{ padding: 7 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          borderLeft: borderedColumns && !editable ? "1px solid rgba(0,0,0,0.30)" : ""
        }}
      >
        {rowsActions.length > 0 &&
          rowsActions.map(action => {
            const act = () => action.action(rowData, updateRows);
            return (
              <IconButton
                key={uuid()}
                aria-label={action.name}
                style={{ width: 36 }}
                onClick={act}
              >
                {action.icon}
              </IconButton>
            );
          })}
      </div>
      {columnsOrder.map((keyName, index) => {
        const column = columns[keyName];
        const dataToDisplay = rowData[keyName];
        const { totalWidthRatio, component, position = "center" } = column;
        const textPosition = positions[position];
        return editable && column.editable ? (
          <InputCell
            {...{
              id,
              keyName,
              totalWidth,
              rowsActionsNumber: rowsActions.length,
              itemsHeight,
              dataToDisplay,
              updateCell,
              column
            }}
            key={keyName}
          />
        ) : (
          <div
            className={`cell${borderedColumns && !editable ? " bordered" : ""}`}
            key={`${id}-${keyName}`}
            style={{
              minWidth: column.colSize,
              width:
                totalWidth > 0
                  ? (totalWidth - 36 - 36 * rowsActions.length) * totalWidthRatio
                  : 0,
              height: itemsHeight,
              justifyContent: textPosition
            }}
          >
            <RowCell
              type={column.dataType}
              customFormat={component ? component : column.customFormat}
            >
              {dataToDisplay}
            </RowCell>
          </div>
        );
      })}
    </div>
  );
};
export default Row;
