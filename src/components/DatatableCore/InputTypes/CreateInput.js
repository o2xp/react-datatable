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
  const val = cellVal || "";
  const isNull = cellVal == null;

  switch (inputType) {
    case "datePicker":
      return (
        <DatePickerWrapper
          cellVal={val}
          isNull={isNull}
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
          cellVal={val}
          isNull={isNull}
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
          cellVal={val}
          isNull={isNull}
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
        cellVal: val,
        isNull,
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
        cellVal: val,
        isNull,
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
          cellVal={val}
          isNull={isNull}
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
