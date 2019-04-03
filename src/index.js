import React, { Component } from "react";
import { Provider} from "react-redux";
import store from "./redux/store/store";
import DatatableInitializer from "./components/DatatableInitializer";

const DatatableContainer = (
  HeadOfTheTable = null,
  BodyOfTheTable = null,
  FootOfTheTable = null,
) =>
  class extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const {options} = this.props;
      return (
        <Provider store={store}>
          <DatatableInitializer optionsInit={options} headOfTheTable={HeadOfTheTable} bodyOfTheTable={BodyOfTheTable} footOfTheTable={FootOfTheTable} />
        </Provider>
      );
    }
  }

export {DatatableContainer};
