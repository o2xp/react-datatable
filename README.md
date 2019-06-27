# @o2xp/react-datatable

[![Build Status](https://api.travis-ci.org/o2xp/react-datatable.svg?branch=master)](https://travis-ci.org/o2xp/react-datatable) [![Code coverage](https://codecov.io/gh/o2xp/react-datatable/branch/master/graph/badge.svg)](https://codecov.io/gh/o2xp/react-datatable/branch/master) [![Maintainability](https://api.codeclimate.com/v1/badges/7a9aa8a3956309171316/maintainability)](https://codeclimate.com/github/o2xp/react-datatable/maintainability) [![License: MIT](https://img.shields.io/badge/license-MIT-orange.svg)](https://opensource.org/licenses/MIT) ![Version](https://img.shields.io/badge/version-1.0.3-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

@o2xp/react-datatable is a modulable component to render data in a table with some nice features !

See a show case [just here](https://o2xp.github.io/react-datatable/).


# Table of Contents
- [**Getting Started**](#getting-started)
    - [**Installing**](#installing)
    - [**Prop Types**](#prop-types)
        - [**Datatable Properties**](#datatable-properties)
        - [**Options Properties**](#options-properties)
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
$ npm i --save @o2xp/react-datatable
```

In your file : 
```jsx
// ES6
import {Datatable} from "@o2xp/react-datatable";
import React, { Component } from "react";

// Basic Example
let options  = {
    keyColumn: 'id',
    data: {
        columns: [ 
            {
                id: "id",
                label: "id",
                colSize: "80px"
            },
            {
                id: "name",
                label: "name",
                colSize: "150px"
            },
            {
                id: "age",
                label: "age",
                colSize: "50px"
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

class App extends Component {
    render() {
        return <Datatable options={options} />;
    }
}

export default App;
```
[**Live implementation**](https://codesandbox.io/s/basic-example-o2xpreact-datatable-wsmjp)
To go **further** check all [**examples**](https://github.com/o2xp/react-datatable/tree/develop/examples)

### Prop Types
#### Datatable Properties
| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| options | object | yes | An object that all the options to render the datatable. See [**Options Properties**](#options-properties). |
| actions | function | no | Function that take as parameter {type, payload}, where type is the action performed (save, delete etc..) and payload the data needed to perform the action. See [**advanced**](https://github.com/o2xp/react-datatable/blob/develop/examples/advanced.md) example. |
| refreshRows | function | no | Function that return an an array of objects where each object is defined by the columns identifier as key and the value. See [**advanced**](https://github.com/o2xp/react-datatable/blob/develop/examples/advanced.md) example. |
| forceRerender | boolean | no | Do you want to rerender the component on route change or keep the state ? |
| CustomTableBodyRow | function | no | Function that take { row, columnsOrder, rowIndex, columnSizeMultiplier, height } and return a react html element. See [**body row**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyRow.md) example. |
| CustomTableBodyCell | function | no | Function that take { cellVal, column, rowId } and return a react html element. See [**body cell**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyCell.md) example. |
| CustomTableHeaderRow | function | no | Function that take { columnsOrder, columnSizeMultiplier } and return a react html element. See [**header row**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyRow.md) example. |
| CustomTableHeaderCell | function | no | Function that take { column } and return a react html element. See [**header cell**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyCell.md) example. |
| customDataTypes | array | no |  object that return an array of object with datatypes and react html element. See [**datatypes cell**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/datatypes.md) example. |

#### Options Properties
| Property | Type | Required? | Default | Description |
|:---|:---:|:---:|:---:|:---|
| title | string | no | " " | Title of the datatable. |
| dimensions .datatable .width | string | no | "100vw" |  Width of the the Datatable. (in vw or px) |
| dimensions .header .height | string | no | "60px" |  Height of the header of the Datatable. (in vh or px) |
| dimensions .body .height | string | no | "300px" |  Height of the body of the Datatable. (in vh or px) |
| dimensions .row .height | string | no | "60px" |  Height of each row of the Datatable. (in vh or px) |
| keyColumn | string | yes | / |  Name of the column that has unique value and allows to identify a row. |
| font | string | no | "Roboto" | Name of the font you are using. It allows the datatable to calculate the overlapping of cells. |
| data .columns | array of object | yes | / |  An array of objects where each object is defined by this keys. Click [here](#column-props) to have more information. |
| data .rows | array of object | yes | / |  An array of objects where each object is defined by the columns identifier as key and the value. |
| features .canEdit | boolean | no | false |  If the user can edit the rows. |
| features .canPrint | boolean | no | false |  If you want stripped rows. |
| features .canDownload | boolean | no | false |  If the user can download the data. |
| features .canSearch | boolean | no | false |  If the user can filter the data by text through a search input. |
| features .canRefreshRows | boolean | no | false |  If the user can click to refresh the rows. |
| features .canOrderColumns | boolean | false |  no | If the user can select the columns to display. |
| features .canSelectRow | boolean | false |  no | If the user can select rows. |
| features .canSaveUserConfiguration | boolean | no | false |  If the user can save his columns configuration. (order and which one is displayed) |
| features .userConfiguration .columnsOrder | array of strings | no | [ ] |  An array of strings where the strings are the column identifier. Datatable will be rendered only with the columns present in the array. |
| features .userConfiguration .copyToClipboard | boolean | no | false |  If true, when the user click on cell it will copy the value in the clipboard. |
| features .rowsPerPage .available | array of number and string | no | [10, 25, 50, 100, "All"] |  An array with the numbers of rows per page you want available. |
| features .rowsPerPage .selected | number or string | no | "All" |  The number of rows per page selected by default. |
| features .additionalIcons | array of object | no | [ ] |  If you want to add icon which trigger a function. Click [here](#additional-icons-props) to have more information. |
| features .selection .selectionIcons | array of object | no | [ ] |  If you want to add icon which execute a function with the rows selected. Click [here](#additional-selection-icons-props) to have more information. |

#### Columns Props
Columns is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| id | string | yes | Id of the column (need to be unique). |
| label | string | yes | Label of the column. |
| colSize | number | yes | Size of the column (needs to be in px). |
| editable | boolean | no | If the each value of row corresponding to the column is editable or not. |
| dataType | string | no | Possible values: "number", "text", "boolean", "date", "time", "dateTime". For more type, see [override](#overriding) section. |
| inputType | string | no | Possible values: "input", "boolean", "select", "datePicker", "timePicker", "dateTimePicker" |
| dateFormat | string | yes (only if datatype === "date" \|\| "time" \|\| "dateTime") | Format of the date. |
| values | array | yes (only if inputType === "select") | Possible values displayed in the select. |
| valueVerification | function | no | If you want to verify value on save. You need to provide a function which take a parameter (the new value) and return and object in this format {error: boolean, message: string} |
| mask | array of regex | no | Works only with inputType === input. To build regex see [**react-text-mask**](https://github.com/text-mask/text-mask/tree/master/react/#readme)|

#### Additional Icons Props
Additional icons is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| title | string | yes | Description of the button. The text will be displayed on hovering the icon |
| icon | Component | yes | Use @material-ui/icons to provide an icon to display. |
| onClick | function | yes | A function that doesn't take parameter. The function will be triggered on click. |

#### Additional Selection Icons Props
Additional selection icons is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| title | string | yes | Description of the button. The text will be displayed on hovering the icon |
| icon | Component | yes | Use @material-ui/icons to provide an icon to display. |
| onClick | function | yes | A function that takes a parameter (the selected rows). . The function will be triggered on click.|

## Overriding

Because we want flexibility for our users we decide to leave a lot of possibility to users. So what can you override ?
- datatypes - [documentation](https://github.com/o2xp/react-datatable/blob/develop/examples/override/datatypes.md)
- body row - [documentation](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyRow.md)
- body cell - [documentation](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyCell.md)
- header row - [documentation](https://github.com/o2xp/react-datatable/blob/develop/examples/override/headerRow.md)
- header cell - [documentation](https://github.com/o2xp/react-datatable/blob/develop/examples/override/headerCell.md)

## Contributing
Do you want to contribute to this project ? Great ! You can start by reading our [**contributing guide**](https://github.com/o2xp/react-datatable/blob/develop/CONTRIBUTING.md).

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
* [Husky](https://github.com/typicode/husky) - Husky can prevent bad `git commit`, `git push` and more ðŸ¶ _woof!_

## Contributors
* [**Morgan Dubois**](https://github.com/MorganDbs)
