import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import rows from "./rows";

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
export const isScrolling = false;
export const dimensions = {
  datatable,
  header,
  body,
  row,
  columnSizeMultiplier,
  isScrolling
};
export const keyColumn = "id";
export const font = "Roboto";
export const columnAction = {
  id: "actions",
  label: "",
  colSize: "150px",
  editable: false
};

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
export const rowsEdited = [];
export const data = {
  columns,
  rows
};
export const pagination = {
  pageSelected: 1,
  pageTotal: 1,
  rowsPerPageSelected: "All",
  rowsCurrentPage: []
};
export const rowsPerPage = {
  available: [10, 25, 50, 100, "All"],
  selected: "All"
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
  canDelete: true,
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
  pagination,
  data,
  features
};
