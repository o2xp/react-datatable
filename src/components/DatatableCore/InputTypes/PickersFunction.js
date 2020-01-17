import { moment } from "../../../moment.config";

export const checkValue = ({ cellVal, mounting, valueVerification }) => {
  const { message, error } = valueVerification(cellVal);
  const newState = {
    tooltipOpen: mounting ? false : error,
    message,
    error
  };

  return newState;
};

export const setValue = ({
  date,
  value,
  dateFormat,
  rowId,
  columnId,
  setRowEdited,
  type,
  valueVerification
}) => {
  let cellVal = value;
  if (cellVal !== null) {
    cellVal = date ? moment(date).format(dateFormat) : cellVal;
    cellVal = value || cellVal;
    cellVal = type === "number" ? parseInt(cellVal) : cellVal;
  }

  let newState = {
    error: false,
    tooltipOpen: false,
    message: ""
  };

  if (valueVerification) {
    newState = checkValue({ cellVal, valueVerification });
  }

  const { error } = newState;
  setRowEdited({
    rowId,
    columnId,
    newValue: cellVal,
    error
  });

  return newState;
};
