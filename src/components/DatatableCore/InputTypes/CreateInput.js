import React from "react";
import DatePickerWrapper from "./DatePickerWrapper";
import TimePickerWrapper from "./TimePickerWrapper";
import DateTimePickerWrapper from "./DateTimePickerWrapper";
import TextFieldWrapper from "./TextFieldWrapper";
import SelectWrapper from "./SelectWrapper";
import BooleanWrapper from "./BooleanWrapper";
import {
  cellValPropType,
  valueVerificationPropType,
  rowIdPropType,
  columnIdPropType,
  setRowEditedPropType,
  valuesPropType,
  dateFormatPropType,
  typePropType,
  maskPropType,
  inputTypePropType,
  labelPropType,
  requiredPropType
} from "../../../proptypes";

const CreateInput = ({
  cellVal,
  valueVerification,
  rowId,
  columnId,
  setRowEdited,
  values,
  dateFormat,
  type,
  mask,
  inputType,
  required = false,
  label = ""
}) => {
  switch (inputType) {
    case "datePicker":
      return (
        <DatePickerWrapper
          cellVal={cellVal}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          dateFormat={dateFormat}
          setRowEdited={setRowEdited}
          label={label}
          required={required}
        />
      );
    case "timePicker":
      return (
        <TimePickerWrapper
          cellVal={cellVal}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          dateFormat={dateFormat}
          setRowEdited={setRowEdited}
          label={label}
          required={required}
        />
      );
    case "dateTimePicker":
      return (
        <DateTimePickerWrapper
          cellVal={cellVal}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          dateFormat={dateFormat}
          setRowEdited={setRowEdited}
          label={label}
          required={required}
        />
      );
    case "select":
      return SelectWrapper({
        cellVal,
        values,
        rowId,
        dateFormat,
        columnId,
        setRowEdited,
        label,
        required
      });
    case "boolean":
      return BooleanWrapper({
        cellVal,
        rowId,
        columnId,
        setRowEdited,
        label,
        required
      });
    case "input":
    default:
      return (
        <TextFieldWrapper
          cellVal={cellVal}
          type={type}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          setRowEdited={setRowEdited}
          mask={mask}
          label={label}
          required={required}
        />
      );
  }
};

CreateInput.propTypes = {
  required: requiredPropType,
  cellVal: cellValPropType.isRequired,
  label: labelPropType,
  valueVerification: valueVerificationPropType,
  mask: maskPropType,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType,
  values: valuesPropType.isRequired,
  dateFormat: dateFormatPropType.isRequired,
  type: typePropType.isRequired,
  inputType: inputTypePropType.isRequired
};

export default CreateInput;
