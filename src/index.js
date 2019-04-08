import React, { Component } from "react";
import { Provider} from "react-redux";
import store from "./redux/store/store";
import DatatableInitializer from "./components/DatatableInitializer";


class Datatable extends Component {
  render() {
    const {
      options = {}, 
      CustomTableBodyCell = null, 
      CustomTableBodyRow = null, 
      CustomTableHeaderCell= null, 
      CustomTableHeaderRow = null,
      customDataTypes = []
    } = this.props;
    
    return (
      <Provider store={store}>
        <DatatableInitializer 
          optionsInit={options} 
          CustomTableBodyCell={CustomTableBodyCell} 
          CustomTableBodyRow={CustomTableBodyRow} 
          CustomTableHeaderCell={CustomTableHeaderCell} 
          CustomTableHeaderRow={CustomTableHeaderRow} 
          customDataTypes={customDataTypes}
        />
      </Provider>
    );
  }
}

export { Datatable };