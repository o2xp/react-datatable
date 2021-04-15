// @flow
import React, { useState, useEffect, useRef } from "react";
import orderBy from "lodash/orderBy";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./Header";
import Body from "./Body";
import useWindowSize from "../../hooks/useWindowSize";
import useDebounce from "../../hooks/useDebounce";

const sortRowsByLabel = (col:any, options:any, setOptions:any) => {
  const index = options.columns.findIndex(el => el === col.id);
  if (index === -1) {
    setOptions({
      columns: [...options.columns, col.id],
      order: [...options.order, "asc"]
    });
  } else if (options.order[index] === "desc") {
    const newArr = [...options.columns];
    const newOrderArr = [...options.order];
    newArr.splice(index, 1);
    newOrderArr.splice(index, 1);
    setOptions({ columns: newArr, order: newOrderArr });
  } else if (options.order[index] === "asc") {
    const newOrderArr = [...options.order];
    newOrderArr[index] = "desc";
    setOptions({
      columns: [...options.columns],
      order: [...newOrderArr]
    });
  }
};

type PropsType = {
  rowsData: Object[],
  columnsData: Object,
  editable: boolean,
  rowsActions: Object[],
  theme?: any
};

const Datatable = ({
  rowsData=[],
  columnsData,
  editable,
  rowsActions=[],
  theme
}: PropsType) => {
  const [columns, setColumns] = useState(columnsData); // columns params + columns order
  const [rows, setRows] = useState(rowsData); // data in original order
  const [value, setValue] = useState(0); // state used to force rerender
  const [sortedRows, setSortedRows] = useState(rowsData); // data that have been reordered and to be displayed
  const [sortOptions, setSortOptions] = useState({ columns: [], order: [] }); // options for reordering system (columns contains the name of the columns that are reordered and order contains the "asc" or "desc" value)
  const [checkedAll, setCheckedAll] = useState({ oneOrMore: false, all: false }); // state that drive the checkbox in the header
  const ref = useRef();
  const { width, height } = useDebounce({
    value: useWindowSize(ref),
    delay: 100
  });

  // determine the minimal width of the scroll panel in which the datatable will be displayed
  const minWidth = React.useMemo(
    () =>
      Object.keys(columns.columns).reduce((accumulator, el) => {
        return accumulator + columns.columns[el].colSize;
      }, 0) +
      rowsActions.length * 36 +
      36 +
      17,
    [columns, rowsActions]
  );

  // update the state to force rerender
  const updateRows = () => {
    setValue(value => ++value);
  };

  const oneRowIsChecked = () => {
    return !!rows.find(el => el.checked);
  };

  const allRowsAreChecked = () => {
    return !rows.find(el => !el.checked);
  };

  const updateColumnsOrder = newOrder => {
    setColumns({ ...columns, columnsOrder: newOrder });
  };

  const toggleCheckedAll = () => {
    const minOneChecked = oneRowIsChecked();
    const newData = [...rows];
    newData.forEach(el => {
      el.checked = !minOneChecked;
    });
    setRows(newData);
  };

  useEffect(() => {
    // determine de width ratio for each column to allow them to grow if screen width is larger than minWidth
    const defineColumnsRatio = () => {
      const total = columns.columnsOrder.reduce((accumulator, currentValue) => {
        return accumulator + columns.columns[currentValue].colSize;
      }, 0);
      Object.keys(columns.columns).forEach(key => {
        columns.columns[key].totalWidthRatio = columns.columns[key].colSize / total;
      });
    };
    defineColumnsRatio();
  }, [columns]);

  // listening to sortOptions to reorder data if needed
  useEffect(() => {
    const sortedArr = orderBy(rows, sortOptions.columns, sortOptions.order);
    setSortedRows(sortedArr);
  }, [sortOptions, rows]);

  // set states when datas change
  useEffect(() => {
    setRows(rowsData);
    setSortedRows(rowsData);
  }, [rowsData]);

  // checkbox system (listening to value to force rerender)
  useEffect(() => {
    const oneOrMore = oneRowIsChecked();
    const all = allRowsAreChecked();
    if (oneOrMore) {
      if (all) {
        setCheckedAll({ oneOrMore: true, all: true });
        return;
      }
      setCheckedAll({ oneOrMore: true, all: false });
    } else {
      setCheckedAll({ oneOrMore: false, all: false });
    }
  }, [rows, value]);

  const defaultTheme = createMuiTheme();

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <ScrollSync>
        <div className="datatable" ref={ref}>
          <ScrollSyncPane>
            <Header
              {...{
                columnsData: columns,
                updateColumnsOrder,
                sortFunction: col => sortRowsByLabel(col, sortOptions, setSortOptions),
                sortingOptions: sortOptions,
                editable,
                width,
                checkedAll,
                toggleCheckedAll,
                rowsActions,
                minWidth
              }}
              id="test-scroll"
            />
          </ScrollSyncPane>
          <ScrollSyncPane>
            <Body
              {...{
                width,
                height,
                rowsData: sortedRows,
                columnsData: columns,
                updateRows,
                editable,
                rowsActions,
                minWidth
              }}
            />
          </ScrollSyncPane>
        </div>
      </ScrollSync>
    </ThemeProvider>
  );
};

export default Datatable;
export {sortRowsByLabel}