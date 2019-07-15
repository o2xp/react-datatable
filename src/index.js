import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import DatatableInitializer from "./components/DatatableInitializer";
import "./app.css";
import { cloneDeep } from "lodash";
import { SnackbarProvider } from "notistack";

class Datatable extends Component {
  render() {
    const {
      options = {},
      forceRerender = true,
      actions = null,
      refreshRows = null,
      stripped = false,
      CustomTableBodyCell = null,
      CustomTableBodyRow = null,
      CustomTableHeaderCell = null,
      CustomTableHeaderRow = null,
      customDataTypes = []
    } = this.props;

    return (
      <Fragment>
        {options.data &&
          options.data.columns &&
          options.data.columns.length > 0 &&
          options.keyColumn && (
            <Provider store={store}>
              <SnackbarProvider>
                <DatatableInitializer
                  optionsInit={cloneDeep(options)}
                  forceRerender={forceRerender}
                  actions={actions}
                  refreshRows={refreshRows}
                  stripped={stripped}
                  CustomTableBodyCell={CustomTableBodyCell}
                  CustomTableBodyRow={CustomTableBodyRow}
                  CustomTableHeaderCell={CustomTableHeaderCell}
                  CustomTableHeaderRow={CustomTableHeaderRow}
                  customDataTypes={customDataTypes}
                />
              </SnackbarProvider>
            </Provider>
          )}
        {options.data && !options.keyColumn && (
          <div id="no-keyColumn">
            @o2xp/react-datatable : You forgot to give keyColumn..
          </div>
        )}
        {(!options.data ||
          !options.data.columns ||
          options.data.columns.length === 0) &&
          options.keyColumn && (
            <div id="no-data">
              @o2xp/react-datatable : You forgot to give data..
            </div>
          )}
        {!options.data && !options.keyColumn && (
          <div id="no-data-and-no-keyColumn">
            @o2xp/react-datatable : You forgot to give data and keyColumn..
          </div>
        )}
      </Fragment>
    );
  }
}

export { Datatable };
