import React from "react";
import moment from "moment";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import {
  cellValPropType,
  rowIdPropType,
  columnIdPropType,
  setRowEditedPropType,
  valuesPropType,
  labelPropType,
  dateFormatPropType,
  requiredPropType
} from "../../../proptypes";

const SelectWrapper = ({
  cellVal,
  label,
  rowId,
  columnId,
  setRowEdited,
  values,
  dateFormat,
  required
}) => {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={cellVal}
        onChange={e =>
          setRowEdited({ rowId, columnId, newValue: e.target.value })
        }
      >
        {values.map(val => {
          return (
            <MenuItem key={`${rowId}-${val}`} value={val}>
              {dateFormat ? moment(val).format(dateFormat) : val}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

SelectWrapper.propTypes = {
  required: requiredPropType,
  label: labelPropType,
  cellVal: cellValPropType.isRequired,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType,
  values: valuesPropType.isRequired,
  dateFormat: dateFormatPropType.isRequired
};

export default SelectWrapper;
