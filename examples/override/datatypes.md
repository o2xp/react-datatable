Component example : 

[**Live implementation**](https://codesandbox.io/s/custom-datatype-example-for-o2xpreact-datatable-ppl29)

```jsx
// ES6
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";

// Custom datatype Example
const options  = {
    keyColumn: 'id',
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
            },
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
        ],
    }
}

const customDataTypes =  [
    {
        dataType: "text",
        component: cellVal => <div style={{ color: "purple" }}>{cellVal}</div>
     },
     {
        dataType: "name",
        component: cellVal => <div style={{ color: "red" }}>{cellVal}</div>
    }
];

class App extends Component {
    render() {
        return <Datatable options={options} customDataTypes={customDataTypes} />;
    }
}

export default App;
```
