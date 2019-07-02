Component example : 

[**Live implementation**](https://codesandbox.io/s/header-cell-override-example-for-o2xpreact-datatable-33tg2)

```jsx

// ES6
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";

// Custom table header cell Example
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
  buildCustomTableHeaderCell = ({ column }) => {
    return <div style={{ color: "blue" }}>{column.label}</div>;
  };

  render() {
    return (
      <Datatable
        options={options}
        CustomTableHeaderCell={this.buildCustomTableHeaderCell}
      />
    );
  }
}

export default App;

```

