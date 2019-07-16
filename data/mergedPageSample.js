import { chunk } from "lodash";
import {
  title,
  dimensions,
  keyColumn,
  font,
  data,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  orderBy,
  features
} from "./optionsObjectSample";

const mergedPageSample = {
  title,
  dimensions: {
    ...dimensions,
    datatable: {
      ...dimensions.datatable,
      totalWidthNumber: 0
    }
  },
  pagination: {
    pageSelected: 5,
    pageTotal: 20,
    rowsPerPageSelected: 10,
    rowsCurrentPage: chunk(data.rows, 10)[4]
  },
  keyColumn,
  actions: null,
  refreshRows,
  isRefreshing,
  stripped,
  searchTerm,
  font,
  orderBy,
  data,
  features: {
    ...features,
    additionalIcons: []
  }
};

export default mergedPageSample;
