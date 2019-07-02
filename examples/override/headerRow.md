Component example : 

[**Live implementation**](https://codesandbox.io/s/header-row-override-example-for-o2xpreact-datatable-ssf72)

```jsx
// ES6
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";

// Custom table header row Example
const options = {
  keyColumn: "id",
  data: {
    columns: [
      {
        id: "id",
        label: "id",
        colSize: "80px",
        dataType: "text"
      },
      {
        id: "name",
        label: "name",
        colSize: "150px",
        dataType: "name"
      },
      {
        id: "age",
        label: "age",
        colSize: "50px",
        dataType: "number"
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence"
      }
    ]
  }
};

class App extends Component {
  buildCustomTableHeaderRow = ({ columnsOrder, columnSizeMultiplier }) => {
    let columns = options.data.columns;
    const columnAction = {
      id: "o2xpActions",
      label: "Actions",
      colSize: "150px",
      editable: false
    };
    return (
      <div className="Table-Row">
        {columnsOrder.map(columnId => {
          let column =
            columnId === "o2xpActions"
              ? columnAction
              : columns.find(col => col.id === columnId);
          const width = `${(
            column.colSize.split("px")[0] * columnSizeMultiplier
          ).toString()}px`;
          return (
            <div className="Table-Header-Cell" key={column.id}>
              <div style={{ color: "green", width }}>{column.label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <Datatable
        options={options}
        CustomTableHeaderRow={this.buildCustomTableHeaderRow}
      />
    );
  }
}

export default App;

```
