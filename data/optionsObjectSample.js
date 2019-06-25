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
    colSize: "200px",
    editable: false,
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
    colSize: "100px",
    editable: true,
    dataType: "text"
  },
  {
    id: "age",
    label: "age",
    colSize: "60px",
    editable: true,
    required: false,
    dataType: "number",
    valueVerification: val => {
      let error;
      let message;
      switch (true) {
        case val > 100:
          error = true;
          message = "Value is too big";
          break;
        case val < 1:
          error = true;
          message = "Value is too low";
          break;
        default:
          error = false;
          message = "";
          break;
      }

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
    editable: true,
    dataType: "boolean"
  },
  {
    id: "birthDate",
    label: "birth date",
    colSize: "180px",
    editable: true,
    dataType: "dateTime",
    dateFormat: "YYYY-MM-DDTHH:mm",
    valueVerification: val => {
      if (new Date().getTime() < new Date(val).getTime()) {
        return {
          error: true,
          message: "Date can't be in the futur"
        };
      }
      return {
        error: false,
        message: ""
      };
    }
  },
  {
    id: "eyeColor",
    label: "eyeColor",
    colSize: "120px",
    editable: true,
    inputType: "select",
    values: ["blue", "brown", "green"]
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
export const rowsSelected = [];
export const refreshRows = null;
export const isRefreshing = false;
export const searchTerm = "";
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
  columnsOrder: ["id", "name", "age", "adult", "birthDate", "eyeColor", "iban"],
  copyToClipboard: false
};
export const selectionIcons = [
  {
    title: "Selected Rows",
    icon: <CallSplitIcon />,
    onClick: res => res
  },
  {
    title: "Selected Rows 2",
    icon: <CallSplitIcon />,
    onClick: res => res
  }
];
export const additionalIcons = [
  {
    title: "Coffee",
    icon: <CallSplitIcon />,
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
  canSelectRow: true,
  canOrderColumns: false,
  canSaveUserConfiguration: false,
  userConfiguration,
  rowsPerPage,
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
