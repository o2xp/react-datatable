This example is regrouping all the options that offer the datatable.

In your file : 

```jsx
// ES6
import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react;

// Advanced Example
const options = {
    title: "My super datatable",
    dimensions: {
        datatable: {
            width: "90vw"
        },
        header: {
            height: "60px"
        },
        body: {
            height: "40vh"
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
                dateFormat: "YYYY-MM-DDTHH:MM:ss"
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
                mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
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
                icon: <CoffeeIcon />,
                onClick: () => alert("Coffee Time!")
            }
        ],
        selectionIcons: [
            {
                title: "Selected Rows",
                icon: <CallSplitIcon />,
                onClick: rows => console.log(rows)
            }
        ]
    }
};

class App extends Component {
    render() {
        return <Datatable options={options} />;
    }
}
```
