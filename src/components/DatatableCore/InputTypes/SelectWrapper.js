import React from "react";
import moment from "moment";
import { Select, MenuItem } from "@material-ui/core";
import {
  cellValPropType,
  rowIdPropType,
  columnIdPropType,
  setRowEditedPropType,
  valuesPropType,
  dateFormatPropType
} from "../../../proptypes";

const SelectWrapper = ({
  cellVal,
  rowId,
  columnId,
  setRowEdited,
  values,
  dateFormat
}) => {
  return (
    <Select
      fullWidth
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
  );
};

SelectWrapper.propTypes = {
  cellVal: cellValPropType.isRequired,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType,
  values: valuesPropType.isRequired,
  dateFormat: dateFormatPropType.isRequired
};

export default SelectWrapper;
