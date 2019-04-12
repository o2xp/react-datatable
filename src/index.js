import React, { Component, Fragment } from "react";
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
      <Fragment>
        
        {options.data && options.keyColumn &&
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
        }
        {
          options.data && !options.keyColumn &&
          <div id="no-keyColumn">@o2xp/react-datatable : You forgot to give keyColumn..</div>
        }
        {
          !options.data && options.keyColumn &&
          <div id="no-data">@o2xp/react-datatable : You forgot to give data..</div>
        }
        {
          !options.data && !options.keyColumn &&
          <div id="no-data-and-no-keyColumn">@o2xp/react-datatable : You forgot to give data and keyColumn..</div>
        }
      </Fragment>
    );
  }
}

export { Datatable };