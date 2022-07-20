This example is regrouping all the options that offer the datatable.

[**Live implementation**](https://codesandbox.io/s/advanced-example-for-o2xpreact-datatable-tsb2j)

In your file : 

```jsx
// ES6
import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import {
  FreeBreakfast as CoffeeIcon,
  CallSplit as CallSplitIcon
} from "@material-ui/icons";
import { chunk } from "lodash";

// Advanced Example
const options = {
  title: "My super datatable",
  dimensions: {
    datatable: {
      width: "90%",
      height: "40%"
    },
    row: {
      height: "48px"
    }
  },
  keyColumn: "id",
  font: "Arial",
  data: {
    columns: [
      {
        id: "id",
        label: "id",
        colSize: "150px",
        editable: false
      },
      {
        id: "name",
        label: "name",
        colSize: "100px",
        editable: true,
        dataType: "text",
        inputType: "input"
      },
      {
        id: "age",
        label: "age",
        colSize: "80px",
        editable: true,
        dataType: "number",
        valueVerification: val => {
          let error = val > 100 ? true : false;
          let message = val > 100 ? "Value is too big" : "";
          return {
            error: error,
            message: message
          };
        }
      },
      {
        id: "adult",
        label: "adult",
        colSize: "50px",
        editable: true,
        dataType: "boolean",
        inputType: "checkbox"
      },
      {
        id: "birthDate",
        label: "birth date",
        colSize: "120px",
        editable: true,
        dataType: "date",
        inputType: "datePicker",
        dateFormatIn: "YYYY-MM-DDTHH:MM:ss"
        dateFormatOut: "YYYY-MM-DDTHH:MM:ss"
      },
      {
        id: "color",
        label: "color",
        colSize: "100px",
        editable: true,
        inputType: "select",
        values: ["green", "blue", "brown"]
      },
      {
        id: "creditCard",
        label: "Credit Card",
        colSize: "150px",
        editable: true,
        inputType: "input",
        mask: [
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59",
        color: "green",
        creditCard: "4478 7842 2486 8743"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19",
        color: "blue",
        creditCard: "7845 5789 4236 7861"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44",
        color: "green",
        creditCard: ""
      }
    ]
  },
  features: {
    canEdit: true,
    canDelete: true,
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canFilter: true,
    canRefreshRows: true,
    canOrderColumns: true,
    canSelectRow: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["id", "name", "age", "birthDate", "creditCard", "color"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
    additionalIcons: [
      {
        title: "Coffee",
        icon: <CoffeeIcon color="primary" />,
        onClick: () => alert("Coffee Time!")
      }
    ],
    selectionIcons: [
      {
        title: "Selected Rows",
        icon: <CallSplitIcon color="primary" />,
        onClick: rows => console.log(rows)
      }
    ]
  }
};

class App extends Component {
  actionsRow = ({ type, payload }) => {
    console.log(type);
    console.log(payload);
  };

  refreshRows = () => {
    const { rows } = options.data;
    const randomRows = Math.floor(Math.random() * rows.length) + 1;
    const randomTime = Math.floor(Math.random() * 4000) + 1000;
    const randomResolve = Math.floor(Math.random() * 10) + 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomResolve > 3) {
          resolve(chunk(rows, randomRows)[0]);
        }
        reject(new Error("err"));
      }, randomTime);
    });
  };

  render() {
    return (
      <Datatable
        options={options}
        refreshRows={this.refreshRows}
        actions={this.actionsRow}
      />
    );
  }
}

export default App;

```
