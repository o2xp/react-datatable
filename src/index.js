import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import DatatableInitializer from "./components/DatatableInitializer";
import "./app.css";
import { cloneDeep } from "lodash";
import { SnackbarProvider } from "notistack";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers/reducers";




class Datatable extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducers, applyMiddleware(thunk));
  }

  render() {
    const {
      options = {},
      forceRerender = false,
      actions = null,
      refreshRows = null,
      stripped = false,
      customProps = null,
      CustomTableBodyCell = null,
      CustomTableBodyRow = null,
      CustomTableHeaderCell = null,
      CustomTableHeaderRow = null,
      customDataTypes = [],
      text = {},
      theme = {}
    } = this.props;

    if (options.data && !options.keyColumn) {
      console.log("@o2xp/react-datatable : You forgot to give keyColumn..");
    }

    if ((!options.data ||
      !options.data.columns ||
      options.data.columns.length === 0) &&
      options.keyColumn) {
      console.log("@o2xp/react-datatable : You forgot to give data..");
    }


    if (!options.data && !options.keyColumn) {
      console.log("@o2xp/react-datatable : You forgot to give data and keyColumn..");
    }


    return (
      <>
        {options.data &&
          options.data.columns &&
          options.data.columns.length > 0 &&
          options.keyColumn && (
            <Provider store={this.store}>
              <SnackbarProvider>
                <DatatableInitializer
                  optionsInit={cloneDeep(options)}
                  forceRerender={forceRerender}
                  actions={actions}
                  refreshRows={refreshRows}
                  stripped={stripped}
                  customProps={customProps}
                  CustomTableBodyCell={CustomTableBodyCell}
                  CustomTableBodyRow={CustomTableBodyRow}
                  CustomTableHeaderCell={CustomTableHeaderCell}
                  CustomTableHeaderRow={CustomTableHeaderRow}
                  customDataTypes={customDataTypes}
                  text={text}
                  theme={theme}
                />
              </SnackbarProvider>
            </Provider>
          )}
      </>
    );
  }
}

export { Datatable };