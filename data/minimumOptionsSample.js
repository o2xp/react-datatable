import { keyColumn, data } from "./optionsObjectSample";

const minimumOptionsSample = {
  // Only here to avoid error in reducer
  dimensions: {
    datatable: {
      width: "100vw",
      height: "100vh"
    }
  },
  keyColumn,
  data
};

export default minimumOptionsSample;
