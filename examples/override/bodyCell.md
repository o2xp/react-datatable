Component example : 

[**Live implementation**](https://codesandbox.io/s/body-cell-override-example-for-o2xpreact-datatable-12rof)

```jsx
// ES6
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";

// Custom table body cell Example
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
  buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
    let val;
    switch (column.dataType) {
      case "boolean":
        if (cellVal) {
          val = <div style={{ color: "green", textAlign: "center" }}>Yes</div>;
        } else {
          val = <div style={{ color: "red", textAlign: "center" }}>No</div>;
        }
        break;
      default:
        val = <div style={{ color: "blue" }}>{cellVal}</div>;
        break;
    }
    return val;
  };

  render() {
    return (
      <Datatable
        options={options}
        CustomTableBodyCell={this.buildCustomTableBodyCell}
      />
    );
  }
}

export default App;

```
