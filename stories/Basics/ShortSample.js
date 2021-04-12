import React from "react";
import Moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import intersectionWith from "lodash/intersectionWith";
import ClearIcon from "@material-ui/icons/Clear";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { O2xpDatatable } from "../../src/index";
import storyOptionsNoActionSample from "../Samples/storyOptionsNoActionSample";

const shortSample = () => {
  const [editable, setEditable] = React.useState(false);
  // backup
  const [savedData, setSavedData] = React.useState(
    cloneDeep(storyOptionsNoActionSample.data.rows)
  );
  // backup to undo filter (not deep copy)
  const [data, setData] = React.useState(storyOptionsNoActionSample.data.rows);
  // array that countains filtered data
  const [filteredData, setFilteredData] = React.useState(data);

  const search = searchValue => {
    const regexAnd = /^\w+\s*=(\s*\w+\s*)*( & \w+\s*=(\s*\w+\s*)*)*$/;
    const regexOr = /^\w+\s*=(\s*\w+\s*)*( \| \w+\s*=(\s*\w+\s*)*)*$/;

    if (searchValue.match(regexOr)) {
      const array = searchValue.match(regexOr)[0].split(" | ");
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
      const array = searchValue.match(regexAnd)[0].split(" & ");
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
  };

  const columns = {
    columns: {
      id: {
        id: "id",
        label: "Id",
        colSize: 200,
        editable: false,
        required: true,
        dataType: "text",
        valueVerification: val => {
          const error = val === "whatever";
          const message = val === "whatever" ? "Value is not valid" : "";
          return {
            error,
            message
          };
        }
      },
      name: {
        id: "name",
        label: "Name",
        colSize: 150,
        editable: true,
        dataType: "text"
      },
      age: {
        id: "age",
        label: "Age",
        colSize: 100,
        editable: true,
        dataType: "number",
        valueVerification: val => {
          let error;
          let message;
          switch (true) {
            case val > 100:
              error = true;
              message = "Value is too big";
              break;
            case val < 1:
              error = true;
              message = "Value is too low";
              break;
            default:
              error = false;
              message = "";
              break;
          }

          return {
            error,
            message
          };
        }
      },
      adult: {
        id: "adult",
        label: "Adult",
        colSize: 100,
        editable: true,
        dataType: "boolean",
        component: checked => {
          return <div>{checked ? <ClearIcon /> : <RadioButtonUncheckedIcon />}</div>;
        },
        editComponent: (celData, updateCell, width, options, id) => {
          const [value, setValue] = React.useState(celData);
          React.useEffect(() => {
            setValue(celData);
          }, [celData]);

          const handleChange = newValue => {
            updateCell(options.id, id, newValue);
          };
          return (
            <FormControlLabel
              style={{
                width: width - 8,

                height: 30,
                overflow: "hidden",
                justifyContent: "center",
                margin: 0
              }}
              control={
                <Checkbox
                  checked={value}
                  onChange={event => {
                    handleChange(event.target.checked);
                    setValue(event.target.checked);
                  }}
                  color="secondary"
                />
              }
              //   label={`${options.label}*`}
            />
          );
        }
      },
      birthdate: {
        id: "birthdate",
        label: "Birthdate",
        colSize: 160,
        editable: true,
        dataType: "date",
        dateFormatIn: "YYYY-MM-DDTHH:mm",
        dateFormatOut: "YYYY-MM-DDTHH:mm",
        component: date => {
          return date !== "" ? <div>{Moment(date).format("DD/MM/yyyy")}</div> : undefined;
        },
        valueVerification: val => {
          if (new Date().getTime() < new Date(val).getTime()) {
            return {
              error: true,
              message: "Date can't be in the futur"
            };
          }
          return {
            error: false,
            message: ""
          };
        }
      },
      eyecolor: {
        id: "eyecolor",
        label: "Eye Color",
        colSize: 130,
        editable: true,
        inputType: "select",
        values: ["blue", "brown", "green"]
      },
      iban: {
        id: "iban",
        label: "Iban",
        colSize: 250,
        editable: false,
        dataType: "iban"
      }
    },
    columnsOrder: ["id", "name", "age", "adult", "birthdate", "eyecolor", "iban"],
    itemsHeight: 36
  };

  const rowsActions = [
    {
      name: "test",
      icon: <DeleteIcon />,
      action: row => {
        const newData = data.filter(el => el.id !== row.id);
        setData(newData);
      }
    }
  ];

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const saveChanges = () => {
    setSavedData(cloneDeep(data));
  };

  // if in edition mode and discarding, input are not edited
  const discardChanges = () => {
    setData(cloneDeep(savedData));
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          type="button"
          onClick={() => setEditable(!editable)}
          style={{ margin: "0 20px" }}
        >
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
          onKeyPress={event => {
            if (event.key === "Enter") {
              search(event.target.value);
            }
          }}
        />
      </div>
      <div style={{ width: "100%", minWidth: 1000, height: "calc(100vh - 30px - 43px)" }}>
        <O2xpDatatable
          rowsData={filteredData}
          columnsData={columns}
          editable={editable}
          rowsActions={rowsActions}
        />
      </div>
    </>
  );
};

export default shortSample;
