import React from "react";
import { Checkbox } from "@material-ui/core";
import {
  cellValPropType,
  rowIdPropType,
  columnIdPropType,
  setRowEditedPropType
} from "../../../proptypes";

const BooleanWrapper = ({ cellVal, rowId, columnId, setRowEdited }) => {
  return (
    <Checkbox
      checked={cellVal}
      color="primary"
      onChange={(e, checked) =>
        setRowEdited({ rowId, columnId, newValue: checked })
      }
    />
  );
};

BooleanWrapper.propTypes = {
  cellVal: cellValPropType.isRequired,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType
};

export default BooleanWrapper;
