import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";

const storeNoDataSample = {
  datatableReducer: {
    title: "My super datatable",
    dimensions: {
      datatable: {
        width: "90vw"
      },
      header: {
        height: "60px"
      },
      body: {
        height: "300px"
      },
      row: {
        height: "60px"
      }
    },
    keyColumn: "id",
    font: "Arial",
    data: {
      columns: [],
      rows: []
    },
    features: {
      canEdit: true,
      canPrint: true,
      canDownload: true,
      canSearch: false,
      canRefreshRows: false,
      canFilterColumns: false,
      canSaveUserConfiguration: false,
      userConfiguration: {
        columnsOrder: [],
        copyToClipboard: false
      },
      rowsPerPage: {
        available: [10, 25, 50, 100],
        selected: 50
      },
      selection: {
        rowsSelectable: false,
        selectPageRows: false,
        selectAllRows: false
      },
      additionalIcons: [],
      selectionIcons: [
        {
          tooltip: "Selected Rows",
          icon: <CallSplitIcon />,
          position: 5,
          onClick: rows => rows
        }
      ]
    }
  }
};

export default storeNoDataSample;
