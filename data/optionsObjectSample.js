import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import rows from "./rows";

export const title = "My super datatable";
export const datatable = {
  width: "90vw",
  height: "40vh",
  widthNumber: 921.6
};
export const header = {
  height: "60px",
  heightNumber: 60
};
export const body = {
  heightNumber: 768 * 0.4 - 180
};
export const row = {
  height: "33px",
  heightNumber: 33
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
  id: "o2xpActions",
  label: "Actions",
  hiddenCreate: true,
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
export const rowsGlobalEdited = [];
export const rowsSelected = [];
export const newRows = [];
export const rowsDeleted = [];
export const refreshRows = null;
export const isRefreshing = false;
export const stripped = false;
export const searchTerm = "";
export const orderBy = [];
export const data = {
  columns,
  rows
};
export const pagination = {
  pageSelected: 1,
  pageTotal: 1,
  rowsPerPageSelected: "All",
  rowsCurrentPage: [],
  rowsToUse: rows
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
export const additionalActions = [
  {
    title: "Coffee",
    icon: <CallSplitIcon />,
    onClick: res => res
  }
];
export const features = {
  canEdit: true,
  canEditRow: null,
  canGlobalEdit: false,
  canAdd: false,
  canPrint: true,
  canDownload: true,
  canDuplicate: false,
  canDelete: true,
  canSearch: false,
  canRefreshRows: false,
  canSelectRow: true,
  canOrderColumns: false,
  canSaveUserConfiguration: false,
  editableIdNewRow: [],
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
