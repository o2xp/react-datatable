import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";

const storeNoRowsDataSample = {
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
      columns: [
        {
          id: "id",
          label: "id",
          colSize: 10,
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
          colSize: 20,
          editable: false,
          dataType: "text"
        },
        {
          id: "age",
          label: "age",
          colSize: 3,
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
          colSize: 0,
          editable: false,
          dataType: "boolean",
          inputType: "checkbox"
        },
        {
          id: "birthDate",
          label: "birth date",
          colSize: 10,
          editable: false,
          dataType: "date",
          inputType: "date",
          dateFormat: "YYYY-MM-DDTHH:MM:ss"
        },
        {
          id: "iban",
          label: "iban",
          colSize: 10,
          editable: false,
          dataType: "iban"
        }
      ],
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
  },
  customComponentsReducer: {
    CustomTableBodyCell: null,
    CustomTableBodyRow: null,
    CustomTableHeaderCell: null,
    CustomTableHeaderRow: null,
    customDataTypes: null
  }
};

export default storeNoRowsDataSample;
