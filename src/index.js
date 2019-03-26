import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import store from "./redux/store/store";
import Datatable from "./components/Datatable";

class DatatableContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Datatable />
      </Provider>
    );
  }
}

export { DatatableContainer };
