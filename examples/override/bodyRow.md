Component example : 
```jsx
// ES6
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";

// Custom datatype Example
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
  buildCustomTableBodyRow = ({
    row,
    columnsOrder,
    rowIndex,
    columnSizeMultiplier,
    height
  }) => {
    let columns = options.data.columns;
    const columnAction = {
      id: "actions",
      label: "Actions",
      colSize: "150px",
      editable: false
    };
    return (
      <div
        className="Table-Row"
        style={{
          height: height
        }}
      >
        {columnsOrder.map(columnId => {
          let column =
            columnId === "actions"
              ? columnAction
              : columns.find(col => col.id === columnId);
          const width = `${(
            column.colSize.split("px")[0] * columnSizeMultiplier
          ).toString()}px`;
          return (
            <div
              className="Table-Cell"
              style={{
                background: rowIndex % 2 === 0 ? "#3f3f3f" : "#5f5f5f"
              }}
              key={columnId}
            >
              <div
                style={{
                  color: "pink",
                  width
                }}
              >
                {row[columnId]}
              </div>
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
        CustomTableBodyRow={this.buildCustomTableBodyRow}
      />
    );
  }
}

export default App;
```
