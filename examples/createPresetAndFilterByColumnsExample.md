This example is regrouping the new options implemented(create preset and multiple filter by columns) that offer the datatable.

[**Live implementation**](https://codesandbox.io/s/create-preset-filter-by-column-for-o2xp-react-datatable-ycxeql?file=/src/index.js)

In your file : 

```jsx
import ReactDOM from "react-dom";
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";

const options = {
  title: "Test",
  dimensions: {
    datatable: {
      width: "100%",
      height: "70vh"
    }
  },
  keyColumn: "id",
  data: {
    columns: [
      {
        id: "id",
        label: "id",
        colSize: "200px",
        editable: false,
        required: true,
        dataType: "text",
        valueVerification: (val) => {
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
        valueVerification: (val) => {
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
        dateFormatIn: "YYYY-MM-DDTHH:mm",
        dateFormatOut: "YYYY-MM-DDTHH:mm",
        valueVerification: (val) => {
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
    ],
    rows: [
      {
        index: 0,
        id: "5cd9307025f4f0572995990f",
        name: "Hunt Valdez",
        age: 2,
        adult: false,
        birthDate: "2017-06-02T11:22",
        iban: "",
        eyeColor: "green"
      },
      {
        index: 1,
        id: "5cd93070d21a6d52114fe3ef",
        name: "Oneil Osborn",
        age: 75,
        adult: true,
        birthDate: "1944-12-08T04:35",
        iban: "FR9436905982392049415972699",
        eyeColor: "brown"
      },
      {
        index: 2,
        id: "5cd930706cc8e22cc8480149",
        name: "Pennington Robinson",
        age: 54,
        adult: true,
        birthDate: "1965-02-12T18:38",
        iban: "",
        eyeColor: "brown"
      }
    ]
  },
  features: {
    canSearch: true,
    canFilter: true,
    canOrderColumns: true,
    canCreatePreset: true,
    columnsPresetsToDisplay: [
      {
        presetName: "Show blue columns",
        columnsToShow: ["id", "name", "age"],
        isActive: false,
        type: "predefinedPreset"
      },
      {
        presetName: "Show one columns",
        columnsToShow: ["age"],
        isActive: false,
        type: "predefinedPreset"
      }
    ]
  }
};

class App extends Component {
  render() {
    return <Datatable options={options} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```
