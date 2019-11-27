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
      text = {}
    } = this.props;
    
    return (
      <Fragment>
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
