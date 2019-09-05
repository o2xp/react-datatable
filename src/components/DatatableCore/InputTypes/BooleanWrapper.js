import React from "react";
import { Checkbox } from "@material-ui/core";
import {
  cellValPropType,
  rowIdPropType,
  columnIdPropType,
  setRowEditedPropType,
  requiredPropType
} from "../../../proptypes";

const BooleanWrapper = ({
  cellVal,
  rowId,
  columnId,
  setRowEdited,
  required
}) => {
  return (
    <Checkbox
      required={required}
      checked={cellVal}
      color="primary"
      onChange={(e, checked) =>
        setRowEdited({ rowId, columnId, newValue: checked })
      }
    />
  );
};

BooleanWrapper.propTypes = {
  required: requiredPropType,
  cellVal: cellValPropType.isRequired,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType
};

export default BooleanWrapper;
