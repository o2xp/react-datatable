// @flow
/* istanbul ignore file */

import React from "react";
import intersectionWith from "lodash/intersectionWith";
import TextField from "@material-ui/core/TextField";
import { debounce } from "lodash";

const ToolBar = ({
  toggleEditableStatus,
  saveChanges,
  discardChanges,
  rowsData,
  setDataToDisplay
}: {
  toggleEditableStatus: any,
  saveChanges: any,
  discardChanges: any,
  rowsData: any,
  setDataToDisplay: any
}) => {
  const [searchTerm] = React.useState([""]);
  const [value, setValue] = React.useState(0);

  const handleChanges = event => {
    searchTerm[0] = event.target.value;
    setValue(value + 1);
  };

  const search = (data, setFilteredData, searchVal) => {
    const searchValue = searchVal[0];
    if (searchTerm[1] !== searchValue) {
      searchTerm[1] = searchValue;
      const regexAnd = /^\w+\s*=(\s*\w+\s*)*( & \w+\s*=(\s*\w+\s*)*)*$/;
      const regexOr = /^\w+\s*=(\s*\w+\s*)*( \| \w+\s*=(\s*\w+\s*)*)*$/;

      const difficultRegexAnd = /^\w+\s*=((\s*\w+\s*)*( \| \s*\w+\s*)+)( & \w+\s*=((\s*\w+\s*)*( \| \s*\w+\s*)*))*$/;
      const difficultRegexOr = /^(\w+\s*=[\s*\w+\s*]*[ \| \s*\w+\s*]+)( \| \w+\s*=([\s*\w+\s*]*[ \| \s*\w+\s*]*))*$/;

      const simpleEqualityRegex = /^\w+\s*=(\s*\w+\s*)*$/;
      if (searchValue.match(difficultRegexOr)) {
        const match = searchValue.match(difficultRegexOr) || [""];
        const array = match[0].split("|");
        let temp = "";
        const searchItem = [];
        for (let i = array.length - 1; i >= 0; i -= 1) {
          if (temp !== "") temp = "|" + temp;
          temp = array[i] + temp;
          if (array[i].match(simpleEqualityRegex)) {
            const firstArray = temp.split("=");
            const item = firstArray[0].trim();
            const values = firstArray[1].split("|");
            searchItem.push({ name: item, values });
            temp = "";
          }
        }
        const newData = data.filter(element => {
          return searchItem.find(item => {
            const check = !!element[item.name] ? element[item.name].toString() : "";
            return item.values.some(value => {
              return check.includes(value.trim());
            });
          });
        });
        setFilteredData(newData);
      } else if (searchValue.match(regexOr)) {
        const match = searchValue.match(regexOr) || [""];
        const array = match[0].split("|");
        const searchItem = [];
        array.forEach(item => {
          const arr = item.split("=");
          const name = arr[0].trim();
          searchItem.push({ name, value: arr[1].trim() });
        });
        const newData = data.filter(element => {
          return searchItem.find(item => {
            const check = element[item.name]
              ? element[item.name].toString().toLowerCase()
              : "";

            return check.includes(item.value);
          });
        });
        setFilteredData(newData);
      } else if (searchValue.match(regexAnd)) {
        const match = searchValue.match(regexAnd) || [""];
        const array = match[0].split(" & ");
        const searchItem = [];
        array.forEach(item => {
          const arr = item.split("=");
          const name = arr[0].trim();
          searchItem.push({ name, value: arr[1].trim() });
        });
        const results = [];
        searchItem.forEach(item => {
          results.push(
            data.filter(element => {
              const check = element[item.name]
                ? element[item.name].toString().toLowerCase()
                : "";
              return check.includes(item.value);
            })
          );
        });
        const isEqual = (a, b) => {
          return a.id === b.id;
        };

        const newData = intersectionWith(...results, isEqual);
        setFilteredData(newData);
      } else if (searchValue === "=checked") {
        const newData = data.filter(element => {
          return element.checked;
        });
        setFilteredData(newData);
      } else if (searchValue === "=!checked") {
        const newData = data.filter(element => {
          return !element.checked;
        });
        setFilteredData(newData);
      } else {
        const newData =
          searchValue === ""
            ? [...data]
            : data.filter(element => {
                return Object.keys(element).find(key => {
                  const check = element[key].toString().toLowerCase();
                  return check.includes(searchValue);
                });
              });
        setFilteredData(newData);
      }
    }
  };

  React.useEffect(() => {
    searchThrottled(rowsData, setDataToDisplay, searchTerm);
  }, [value]);

  const searchThrottled = debounce(
    (rowsData, setDataToDisplay, searchTerm) =>
      search(rowsData, setDataToDisplay, searchTerm),
    1000
  );

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button type="button" onClick={toggleEditableStatus} style={{ margin: "0 20px" }}>
          edit mode
        </button>
        <button type="button" onClick={saveChanges} style={{ margin: "0 20px" }}>
          save changes
        </button>
        <button type="button" onClick={discardChanges} style={{ margin: "0 20px" }}>
          discard changes
        </button>
        <TextField
          style={{
            margin: "0 20px",
            width: 250,
            height: 30,
            overflow: "hidden",
            textAlign: "center"
          }}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={handleChanges}
          onKeyPress={event => {
            if (event.key === "Enter") {
              search(rowsData, setDataToDisplay, event.target.value);
            }
          }}
        />
      </div>
    </>
  );
};

export default ToolBar;
