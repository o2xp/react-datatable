# @o2xp/react-datatable

[![Build Status](https://api.travis-ci.org/o2xp/react-datatable.svg?branch=master)](https://travis-ci.org/o2xp/react-datatable) [![Code coverage](https://codecov.io/gh/o2xp/react-datatable/branch/master/graph/badge.svg)](https://codecov.io/gh/o2xp/react-datatable/branch/master) [![Maintainability](https://api.codeclimate.com/v1/badges/7a9aa8a3956309171316/maintainability)](https://codeclimate.com/github/o2xp/react-datatable/maintainability) [![License: MIT](https://img.shields.io/badge/license-MIT-orange.svg)](https://opensource.org/licenses/MIT) ![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)

@o2xp/react-datatable is a modulable component to render data in a table with some additionals features !

See a live example [just here](https://o2xp.github.io/react-datatable/).

# Table of Contents
- [**Getting Started**](#getting-started)
    - [**Installing**](#installing)
    - [**Prop Types**](#prop-types)
        - [**Global Properties**](#global-properties)
        - [**Columns Props**](#columns-props)
        - [**Additional Icons Props**](#additional-icons-props)
        - [**Additional Selection Icons Props**](#additional-selection-icons-props)
- [**Overriding**](#overriding)
- [**Contributing**](#contributing)
- [**Build With**](#build-with)
- [**Contributors**](#contributors)

## Getting Started
### Installing
```sh
// not working yet
$ npm i --save @o2xp/react-datatable
```

In your file : 
```jsx
// ES6
import {Datatable} from "@o2xp/react-datatable";
...
// This is an example, you can put the values you want
let options  = {
    title: "My super datatable",
    dimensions: {
        datatable: {
            width: "90vw",
        },
        header: {
            height: "60px"
        },
        body: {
            height: "40vh"
        },
        row:{
            height: "60px"
        }
    },
    keyColumn: 'id',
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
                valueVerification: (val) => {
                    let error = val === "whatever" ? true : false;
                    let message = val === "whatever" ? "Value is not valid" : "";
                    return {
                        error: error,
                        message: message,
                    }
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
                valueVerification: (val) => {
                    let error = val > 100 ? true : false;
                    let message = val > 100 ? "Value is too big" : "";
                    return {
                        error: error,
                        message: message,
                    }
                }
            },
            {
                id: "adult",
                label: "adult",
                colSize: 0,
                editable: false,
                dataType: "boolean",
                inputType:"checkbox",
            },
            {
                id: "birthDate",
                label: "birth date",
                colSize: 10,
                editable: false,
                dataType: "date"
                inputType: "date",
                dateFormat: "YYYY-MM-DDTHH:MM:ss"
            },
        ],
        rows: [
            {
                id: "50cf",
                age: 28,
                name: "Kerr Mayo",
                adult: true,
                birthDate: "1972-09-04T11:09:59",
            },
            {
                id: "209",
                age: 34,
                name: "Freda Bowman",
                adult: true,
                birthDate: "1988-03-14T09:03:19"
            },
            {
                id: "2dd81ef",
                age: 14,
                name: "Becky Lawrence",
                adult: false,
                birthDate: "1969-02-10T04:02:44"
            }
        ],
    },
    features: {
        canEdit: true,
        canPrint: true,
        canDownload: true,
        canSearch: true,
        canRefreshRows: true,
        canFilterColumns: true,
        canSaveUserConfiguration: true,
        userConfiguration: {
            columnsOrder: ["id", "name", "age"],
            copyToClipboard: true,
        },
        rowsPerPage: {
            available: [10, 25, 50, 100],
            selected: 50
        },
        selection: {
            rowsSelectable: true,
            selectPageRows: true,
            selectAllRows: false,
        },
        additionalIcons: [
            {
                tooltip: 'Coffee',
                icon: <CoffeeIcon/>,
                position: 1,
                onClick: () => alert('Coffee Time!')
            }
        ],
        selectionIcons: [
            {
                tooltip: 'Selected Rows',
                icon: <CallSplitIcon />,
                position: 5,
                onClick: (rows) => console.log(rows)
            }
        ]  
    }
}
...
render() {
    <Datatable options={options} refreshRows={this.refreshRows} saveEditedRows={this.saveEditedRows} saveUserConfiguration={this.saveUserConfiguration}>
}
```

### Prop Types
#### Global Properties
| Property | Type | Required? | Default | Description |
|:---|:---:|:---:|:---:|:---|
| title | string | no | " " | Title of the datatable. |
| dimensions .datatable .width | string | no | "100vw" |  Width of the the Datatable. (in vw or px) |
| dimensions .header .height | string | no | "60px" |  Height of the header of the Datatable. (in vh or px) |
| dimensions .body .height | string | no | "300px" |  Height of the body of the Datatable. (in vh or px) |
| dimensions .row .height | string | no | "60px" |  Height of each row of the Datatable. (in vh or px) |
| keyColumn | string | yes | / |  Name of the column that has unique value and allows to identify a row. |
| font | string | no | "Arial" | Name of the font you are using. It allows the datatable to calculate the overlapping of cells. |
| data .columns | array of object | yes | / |  An array of objects where each object is defined by this keys. Click [here](#column-props) to have more information. |
| data .rows | array of object | yes | / |  An array of objects where each object is defined by the columns identifier as key and the value. |
| features .canEdit | boolean | no | false |  If the user can edit the rows. |
| features .canPrint | boolean | no | false |  If you want stripped rows. |
| features .canDownload | boolean | no | false |  If the user can download the data. |
| features .canSearch | boolean | no | false |  If the user can filter the data by text through a search input. |
| features .canRefreshRows | boolean | no | false |  If the user can click to refresh the rows. |
| features .canFilterColumns | boolean | false |  no | If the user can select the columns to display. |
| features .canSaveUserConfiguration | boolean | no | false |  If the user can save his columns configuration. (order and which one is displayed) |
| features .userConfiguration .columnsOrder | array of strings | no | [ ] |  An array of strings where the strings are the column identifier. Datatable will be rendered only with the columns present in the array. |
| features .userConfiguration .copyToClipboard | boolean | no | true |  If true, when the user click on cell it will copy the value in the clipboard. |
| features .rowsPerPage .available | array of number | no | [10, 25, 50, 100] |  An array with the numbers of rows per page you want available. |
| features .rowsPerPage .selected | number | no | 50 |  The number of rows per page selected by default. |
| features .selection .rowsSelectable | boolean | no | false |  If the user can select row. |
| features .selection .selectPageRows | boolean | no | false |  If the user can do a global select and it selects all the rows of the current page. |
| features .selection .selectAllRows | boolean | no | false |  If the user can do a global select and it selects all the rows. |
| features .selection .additionalIcons | array of object | no | [ ] |  If you want to add icon which trigger a function. Click [here](#additional-icons-props) to have more information. |
| features .selection .selectionIcons | array of object | no | [ ] |  If you want to add icon which execute a function with the rows selected. Click [here](#additional-selection-icons-props) to have more information. |

#### Columns Props
Columns is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| id | string | yes | Id of the column (need to be unique). |
| label | string | yes | Label of the column. |
| colSize | number | yes | Size of the column (between 1 and 15). |
| editable | boolean | no | If the each value of row corresponding to the column is editable or not. |
| dataType | string | no | Possible values: test, number, data. |
| inputType | string | no | Possible values: checkbox, datePicker, select. |
| dateFormat | string | yes (only if datatype = date) | Format of the date. |
| values | array | yes (only if inputType = select) | Possible values displayed in the select. |
| required | boolean | no | If the field can't be empty. |
| valueVerification | function | no | If you want to verify value on save. You need to provide a function which take a parameter (the new value) and return and object in this format {error: boolan, message: string} |

#### Additional Icons Props
Additional icons is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| tooltip | string | no | Description of the button. The text will be displayed on hovering the icon |
| icon | Component | yes | Use @material-ui/icons to provide an icon to display. |
| position | number | no | Positioning of the icon in the icon range. |
| onClick | function | yes | A function that doesn't take parameter. |

#### Additional Selection Icons Props
Additional selection icons is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| tooltip | string | no | Description of the button. The text will be displayed on hovering the icon |
| icon | Component | yes | Use @material-ui/icons to provide an icon to display. |
| position | number | no | Positioning of the icon in the icon range. |
| onClick | function | yes | A function that takes a parameter (the selected rows). |

## Overriding
**_Coming soon !_**

## Contributing
Do you want to contribute to this project ? Great ! You can start by reading our [**contributing guide**](https://github.com/o2xp/react-datatable/blob/develop/CONTRIBUTING.md) and our [**wiki**](https://github.com/o2xp/react-datatable/wiki).

## Build With
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps
* [Material-ui](https://material-ui.com/) - React components that implement Google's Material Design
* [Webpack](https://github.com/webpack/webpack) - A bundler for javascript and friends. Packs many modules into a few bundled assets.
* [Babel](https://github.com/babel/babel) - Babel is a tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.
* [Storybook](https://storybook.js.org/) - Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.
* [Eslint](https://eslint.org/) - ESLint is an open source project originally created by Nicholas C. Zakas in June 2013. Its goal is to provide a pluggable linting utility for JavaScript.
* [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [Enzyme](https://airbnb.io/enzyme/) - Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.
* [Prettier](https://prettier.io/) - Prettier is an opinionated code formatter.
* [Husky](https://github.com/typicode/husky) - Husky can prevent bad `git commit`, `git push` and more 🐶 _woof!_

## Contributors
* [**Morgan Dubois**](https://github.com/MorganDbs) - *Initial work*
* **Mohamed Toure**
