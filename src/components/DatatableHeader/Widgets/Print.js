import React, { Component } from "react";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { Print as PrintIcon } from "@material-ui/icons";

class Print extends Component {
  print = () => {
    window.print();
  };

  render() {
    return (
      <Tooltip TransitionComponent={Zoom} title="Print">
        <span>
          <IconButton onClick={() => this.print()}>
            <PrintIcon color="primary" />
          </IconButton>
        </span>
      </Tooltip>
    );
  }
}

export default Print;
