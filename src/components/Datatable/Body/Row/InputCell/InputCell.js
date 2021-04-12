// @flow
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Moment from "moment";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tooltip: {
      background: "red",
      color: "white",
      fontSize: "0.8rem"
    },
    arrow: {
      color: "red"
    }
  })
);

const EditInput = ({
  options,
  data,
  updateCell,
  id,
  width
}: {
  options: Object,
  data: any,
  updateCell: (string, string, any) => void,
  id: string,
  width: number
}) => {
  const [value, setValue] = useState(data);
  const [errorText, setErrorText] = useState("");
  const classes = useStyles();

  const inputStyle = {
    minWidth: options.colSize - 8,
    width: width - 8,
    height: 30,
    overflow: "hidden",
    textAlign: "center"
  };

  const controlData = toControl => {
    if (options.valueVerification) {
      const control = options.valueVerification(toControl);
      if (control.error) setErrorText(control.message);
      else setErrorText("");
    }
  };
  useEffect(() => {
    setValue(data);
    controlData(data);
  }, [data]);

  const handleChange = event => {
    const { value } = event.target;
    updateCell(options.id, id, value);
    controlData(value);
    setValue(value);
  };

  const handleCheckChange = event => {
    const { checked } = event.target;
    updateCell(options.id, id, checked);
    controlData(checked);
    setValue(checked);
  };

  const inputSwitch = () => {
    if (options.inputType)
      return (
        <Select
          value={value}
          style={inputStyle}
          onChange={handleChange}
          error={errorText !== ""}
        >
          {options.values.map(option => (
            <MenuItem key={uuid()} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      );
    else {
      switch (options.dataType) {
        case "text":
          return (
            <TextField
              style={inputStyle}
              error={errorText !== ""}
              inputProps={{ style: { textAlign: "center" } }}
              value={value}
              onChange={handleChange}
            />
          );
        case "number":
          return (
            <TextField
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              error={errorText !== ""}
              inputProps={{ style: { textAlign: "center" } }}
              style={inputStyle}
              value={value}
              onChange={handleChange}
            />
          );
        case "date":
          return (
            <TextField
              style={inputStyle}
              error={errorText !== ""}
              type="date"
              value={value !== "" ? Moment(value).format("yyyy-MM-DD") : ""}
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
          );
        case "boolean":
          return (
            <FormControlLabel
              style={inputStyle}
              error={errorText !== ""}
              control={
                <Checkbox checked={value} onChange={handleCheckChange} color="primary" />
              }
              label={options.label}
            />
          );
        default:
          return <></>;
      }
    }
  };

  return (
    <Tooltip
      title={errorText}
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      arrow
      disableHoverListener
    >
      {inputSwitch()}
    </Tooltip>
  );
};

const InputCell = ({
  id,
  keyName,
  totalWidth,
  rowsActionsNumber,
  itemsHeight,
  dataToDisplay,
  updateCell,
  column
}: {
  id: any,
  keyName: any,
  totalWidth: any,
  rowsActionsNumber: any,
  itemsHeight: any,
  dataToDisplay: any,
  updateCell: any,
  column: any
}) => {
  const { totalWidthRatio, editComponent } = column;

  return (
    <div
      className="cell"
      key={`${id}-${keyName}`}
      style={{
        minWidth: column.colSize - 10,
        width:
          totalWidth > 0
            ? (totalWidth - 36 - 36 * rowsActionsNumber) * totalWidthRatio - 10
            : 0,
        padding: "0px 5px",
        height: itemsHeight
      }}
    >
      {editComponent ? (
        editComponent(
          dataToDisplay,
          updateCell,
          (totalWidth - 36 - 36 * rowsActionsNumber) * totalWidthRatio,
          column,
          id
        )
      ) : (
        <EditInput
          options={column}
          data={dataToDisplay}
          id={id}
          updateCell={updateCell}
          width={(totalWidth - 36 - 36 * rowsActionsNumber) * totalWidthRatio}
        />
      )}
    </div>
  );
};

export default InputCell;
