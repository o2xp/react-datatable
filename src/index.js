import React, { Component } from "react";
import "./index.css";
import Datatable from "./components/Datatable";

class O2xpDatatable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { rowsData, columnsData, editable, rowsActions, theme } = this.props;

    return (
      <Datatable
        className="o2xp-react-datatable"
        rowsData={rowsData}
        columnsData={columnsData}
        editable={editable}
        rowsActions={rowsActions}
        theme={theme}
      />
    );
  }
}

export default O2xpDatatable;
