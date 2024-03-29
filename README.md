# @o2xp/react-datatable

[![Build Status](https://api.travis-ci.org/o2xp/react-datatable.svg?branch=master)](https://travis-ci.org/o2xp/react-datatable) [![Code coverage](https://codecov.io/gh/o2xp/react-datatable/branch/master/graph/badge.svg)](https://codecov.io/gh/o2xp/react-datatable/branch/master) [![Maintainability](https://api.codeclimate.com/v1/badges/7a9aa8a3956309171316/maintainability)](https://codeclimate.com/github/o2xp/react-datatable/maintainability) [![License: MIT](https://img.shields.io/badge/license-MIT-orange.svg)](https://opensource.org/licenses/MIT) [![Version](https://badge.fury.io/js/%40o2xp%2Freact-datatable.svg)](https://badge.fury.io/js/%40o2xp%2Freact-datatable)
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

**Attention :** the column id **"o2xpActions"** is reserved. Using it can result of unexpected behaviours.

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
| stripped | boolean | no | Do you want stripped rows ? |
| CustomTableBodyRow | function | no | Function that take { row, columnsOrder, rowIndex, columnSizeMultiplier, height } and return a react html element. See [**body row**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyRow.md) example. |
| CustomTableBodyCell | function | no | Function that take { cellVal, column, rowId } and return a react html element. See [**body cell**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/bodyCell.md) example. |
| CustomTableHeaderRow | function | no | Function that take { columnsOrder, columnSizeMultiplier } and return a react html element. See [**header row**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/headerRow.md) example. |
| CustomTableHeaderCell | function | no | Function that take { column } and return a react html element. See [**header cell**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/headerCell.md) example. |
| customDataTypes | array | no |  object that return an array of object with datatypes and react html element. See [**datatypes cell**](https://github.com/o2xp/react-datatable/blob/develop/examples/override/datatypes.md) example. |
| text | object | no |  An object with text to override. See [**text override**](#text-override). |
| theme | object | no | See [**theming**](https://material-ui.com/customization/theming/). |

#### Options Properties
| Property | Type | Required? | Default | Description |
|:---|:---:|:---:|:---:|:---|
| title | string | no | " " | Title of the datatable. |
| text | object | no |  | Un object with key taking a string as value.  Click [here](#override-text) to have more information.|
| dimensions .datatable .width | string | no | "100vw" |  Width of the the Datatable. (in vw / px / %) |
| dimensions .datatable .height | string | no | "300px" |  Height of the Datatable. (in vh / px / %) |
| dimensions .row .height | string | no | "33px" |  Height of each row of the Datatable. (in px) Minimum 33px. |
| keyColumn | string | yes | / |  Name of the column that has unique value and allows to identify a row. |
| currentScreen | string | no | / |  Name of the screen that will used to differentiate created presets. If you put the same string for 2 datatables, it will show the same created presets. |
| font | string | no | "Roboto" | Name of the font you are using. It allows the datatable to calculate the overlapping of cells. |
| data .columns | array of object | yes | / |  An array of objects where each object is defined by this keys. Click [here](#column-props) to have more information. |
| data .rows | array of object | yes | / |  An array of objects where each object is defined by the columns identifier as key and the value. Click [here](#rows-props) to have more information. |
| features .canEdit | boolean | no | false |  If the user can edit the rows. |
| features .canEditRow | (row) => boolean | no | () => true |  Giving row as parameter and expecting a boolean as result. Do determine if a row is editable or not. |
| features .canGlobalEdit | boolean | no | false |  If the user can turn in edit mode all the rows. |
| features .canPrint | boolean | no | false |  If you want stripped rows. |
| features .canDownload | boolean | no | false |  If the user can download the data. |
| features .canCreatePreset | boolean | no | false |  If the user can create preset(list of columns to display).  The created preset will be stored in the local storage.|
| features .canSearch | boolean | no | false |  If the user can filter the data by text through a search input globally. |
| features .canFilter | boolean | no | false |  If the user can filter the data by text through a search input based on different columns. |
| features .canRefreshRows | boolean | no | false |  If the user can click to refresh the rows. |
| features .canOrderColumns | boolean | false |  no | If the user can select the columns to display. |
| features .canSelectRow | boolean | false |  no | If the user can select rows. |
| features .canDuplicate | boolean | false |  no | If the user can duplicate row. |
| features .isUpdatingRows | boolean | false |  no | If you are updating rows on your side. |
| features .canSaveUserConfiguration | boolean | no | false |  If the user can save his columns configuration. (order and which one is displayed) |
| features .userConfiguration .columnsOrder | array of strings | no | [ ] |  An array of strings where the strings are the column identifier. Datatable will be rendered only with the columns present in the array. |
| features .userConfiguration .copyToClipboard | boolean | no | false |  If true, when the user click on cell it will copy the value in the clipboard. |
| features .rowsPerPage .available | array of number and string | no | [10, 25, 50, 100, "All"] |  An array with the numbers of rows per page you want available. |
| features .rowsPerPage .selected | number or string | no | "All" |  The number of rows per page selected by default. |
| features .additionalIcons | array of object | no | [ ] |  If you want to add icon which trigger a function. Click [here](#additional-icons-props) to have more information. |
| features .columnsPresetsToDisplay | array of object | no | [ ] |  If you want to add predefined presets in the Display by presets Tab.  Click [here](#columns-presets-to-display-props) to have more information. |
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
| dateFormatIn | string | yes (only if datatype === "date" \|\| "time" \|\| "dateTime") | Format of the date. |
| dateFormatOut | string | yes (only if datatype === "date" \|\| "time" \|\| "dateTime") | Format you want to display of the date. |
| values | array | yes (only if inputType === "select") | Possible values displayed in the select. |
| valueVerification | function | no | If you want to verify value on save. You need to provide a function which take a parameter (the new value) and return and object in this format {error: boolean, message: string} |
| mask | array of regex | no | Works only with inputType === input. To build regex see [**react-text-mask**](https://github.com/text-mask/text-mask/tree/master/react/#readme)|

#### Rows Props
Rows is an array of object where each object is defined by the columns identifier as key and the value. You can add this key for edit purpose :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| editableId | Array<string> | no | Id of the columns where fields should be editable. |
    
#### Columns Presets To Display Props    
Columns Presets to display is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| presetName | string | yes | Description of the preset.This string will be shown on screen. |
| columnsToShow | array of string | yes | List of existing columns to show |
| isActive | boolean | yes | If the box should be tick |  
| type | string | yes | Must be "predefinedPreset"  |   

#### Additional Actions Props
Additional actions is an array of object construct with these keys :

| Property | Type | Required? | Description |
|:---|:---:|:---:|:---|
| title | string | yes | Description of the button. The text will be displayed on hovering the icon |
| icon | Component | yes | Use @material-ui/icons to provide an icon to display. |
| onClick | function | yes | A function that take a row as parameter. The function will be triggered on click. |

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

#### Text override

| Property | Type | Required? | Default value |
|:---|:---:|:---:|:---|
| search | string | no | "Toggle" |
| searchPlaceholder | string | no | "Search.." |
| edit | string | no | "Edit" |
| clear | string | no | "Clear" |
| save | string | no | "Save" |
| delete | string | no | "Delete" |
| confirmDelete | string | no | "Confirm delete" |
| cancelDelete | string | no | "Cancel delete" |
| download | string | no | "Download data" |
| downloadTitle | string | no | "Download Data" |
| downloadDescription | string | no | "Data will be exported in" |
| downloadSelectedRows | string | no | "Selected rows" |
| downloadCurrentRows | string | no | "Rows of current page" |
| downloadAllRows | string | no | "All rows" |
| display | string | no | "Display columns" |
| refresh | string | no | "Refresh" |
| configuration | string | no | "Configuration" |
| configurationTitle | string | no | "User Configuration" |
| configurationCopy | string | no | "Save cell's content to clipboard on click" |
| configurationColumn | string | no | "Do you want to save the configuration of the columns and copy to clipboard feature ?" |
| configurationReset | string | no | "Reset" |
| configurationSave | string | no | "Save" |
| create | string | no | "Create" |
| createTitle | string | no | "Create a new row" |
| createCancel | string | no | "Cancel" |
| createSubmit | string | no | "Create" |
| duplicate | string | no | "Duplicate" |
| print | string | no | "Print" |
| orderBy | string | no | "Order by" |
| drag | string | no | "Drag" |
| paginationRows | string | no | "Rows" |
| paginationPage | string | no | "Page" |
| createPresetTitle | string | no | "Create New Preset" |
| createPresetDescription | string | no | "Select the columns to save in the preset" |
| createPresetTooltipText | string | no | "Create a new preset" |
| createPresetNamingPlaceholder | string | no | "Preset name" |
| createPresetCancelBtn | string | no | "Cancel" |
| createPresetCreateBtn | string | no | "Create" |

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
* [**Mike Trieu**](https://github.com/tspanda)
* [**Noé Carl**](https://github.com/CarlNoe)
