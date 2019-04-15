import React from "react";
import { Paper } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { minimumOptionsSample } from "../../data/samples";

const defaultStory = () => {
  return (
    <Paper>
      <Datatable options={minimumOptionsSample} />
    </Paper>
  );
};

export default defaultStory;
