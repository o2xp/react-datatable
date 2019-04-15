import React from "react";
import { Paper } from "@material-ui/core";
import { Datatable } from "../../src/index";
import { simpleOptionsNoDataSample } from "../../data/samples";

const noDataStory = () => {
  return (
    <Paper>
      <Datatable options={simpleOptionsNoDataSample} />
    </Paper>
  );
};

export default noDataStory;
