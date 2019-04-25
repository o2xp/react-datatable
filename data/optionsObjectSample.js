import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";

export const title = "My super datatable";
export const datatable = {
  width: "90vw",
  widthNumber: 921.6
};
export const header = {
  height: "60px",
  heightNumber: 60
};
export const body = {
  height: "30vh",
  heightNumber: 768 * 0.3
};
export const row = {
  height: "60px",
  heightNumber: 60
};
export const columnSizeMultiplier = 1;
export const dimensions = {
  datatable,
  header,
  body,
  row,
  columnSizeMultiplier
};
export const keyColumn = "id";
export const font = "Roboto";
export const columns = [
  {
    id: "id",
    label: "id",
    colSize: "150px",
    editable: true,
    required: true,
    dataType: "text",
    valueVerification: val => {
      const error = val === "whatever";
      const message = val === "whatever" ? "Value is not valid" : "";
      return {
        error,
        message
      };
    }
  },
  {
    id: "name",
    label: "name",
    colSize: "200px",
    editable: false,
    dataType: "text"
  },
  {
    id: "age",
    label: "age",
    colSize: "30px",
    editable: true,
    required: false,
    dataType: "number",
    valueVerification: val => {
      const error = val > 100;
      const message = val > 100 ? "Value is too big" : "";
      return {
        error,
        message
      };
    }
  },
  {
    id: "adult",
    label: "adult",
    colSize: "50px",
    editable: false,
    dataType: "boolean",
    inputType: "checkbox"
  },
  {
    id: "birthDate",
    label: "birth date",
    colSize: "180px",
    editable: false,
    dataType: "date",
    inputType: "date",
    dateFormat: "YYYY-MM-DDTHH:MM:ss"
  },
  {
    id: "iban",
    label: "iban",
    colSize: "250px",
    editable: false,
    dataType: "iban"
  }
];
export const rows = [
  {
    id: "50cf",
    age: 28,
    name: "Kerr Mayo",
    adult: true,
    birthDate: "1972-09-04T18:09:59",
    iban: "LU650105597859435517"
  },
  {
    id: "209",
    age: 34,
    name: "Freda Bowman",
    adult: true,
    iban: "LU020106768919913391"
  },
  {
    id: "2dd81ef",
    age: 14,
    name: "Becky Lawrence",
    adult: false,
    birthDate: "1969-02-10T04:02:44",
    iban: "LU250107549217378667"
  }
];
export const data = {
  columns,
  rows
};
export const rowsPerPage = {
  available: [10, 25, 50, 100],
  selected: 50
};
export const userConfiguration = {
  columnsOrder: ["id", "name", "age", "adult", "birthDate", "iban"],
  copyToClipboard: false
};
export const selection = {
  rowsSelectable: true,
  selectPageRows: true,
  selectAllRows: false
};
export const selectionIcons = [
  {
    tooltip: "Selected Rows",
    icon: <CallSplitIcon />,
    position: 5,
    onClick: res => res
  }
];
export const additionalIcons = [
  {
    tooltip: "Selected Rows",
    icon: <CallSplitIcon />,
    position: 5,
    onClick: () => true
  }
];
export const features = {
  canEdit: true,
  canPrint: true,
  canDownload: true,
  canSearch: false,
  canRefreshRows: false,
  canFilterColumns: false,
  canSaveUserConfiguration: false,
  userConfiguration,
  rowsPerPage,
  selection,
  additionalIcons,
  selectionIcons
};
export const options = {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  features
};
