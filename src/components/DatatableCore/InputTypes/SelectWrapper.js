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
  dateFormatIn,
  dateFormatOut,
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
              {dateFormatIn
                ? moment(val, dateFormatIn).format(dateFormatOut)
                : val}
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
  dateFormatIn: dateFormatPropType.isRequired,
  dateFormatOut: dateFormatPropType.isRequired
};

export default SelectWrapper;
