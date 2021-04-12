import React from "react";
import Moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import ClearIcon from "@material-ui/icons/Clear";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { O2xpDatatable } from "../../src/index";
import storyOptionsSample from "../Samples/storyOptionsSample";
import ToolBar from "../../src/components/ToolBar";

const defaultStory = () => {
  const [editable, setEditable] = React.useState(false);
  // backup
  const [savedData, setSavedData] = React.useState(
    cloneDeep(storyOptionsSample.data.rows)
  );
  // backup to undo filter (not deep copy)
  const [data, setData] = React.useState(storyOptionsSample.data.rows);
  // array that contains filtered data
  const [filteredData, setFilteredData] = React.useState(data);

  const columns = {
    columns: {
      id: {
        id: "id", //required
        label: "Id",
        colSize: 150, // required
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
        },
        position: "start"
      },
      index: {
        id: "index",
        label: "Index",
        colSize: 100,
        editable: false,
        required: true,
        dataType: "text",
        position: "center"
      },
      name: {
        id: "name",
        label: "Name",
        colSize: 150,
        editable: true,
        dataType: "text",
        position: "start"
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
        },
        position: "center"
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
        },
        position: "center"
      },
      birthdate: {
        id: "birthdate",
        label: "Birthdate",
        colSize: 160,
        editable: true,
        dataType: "date",
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
        },
        position: "center"
      },
      eyecolor: {
        id: "eyecolor",
        label: "Eye Color",
        colSize: 130,
        editable: true,
        inputType: "select",
        values: ["blue", "brown", "green"],
        position: "center"
      },
      iban: {
        id: "iban",
        label: "Iban",
        colSize: 250,
        editable: false,
        dataType: "iban",
        position: "start"
      }
    },
    columnsOrder: [
      "index",
      "id",
      "name",
      "age",
      "adult",
      "birthdate",
      "eyecolor",
      "iban"
    ], //required
    itemsHeight: 36, //required
    borderedColumns: false,
    borderedRows: false
  };

  const rowsActions = [
    {
      name: "delete",
      icon: <DeleteIcon color="secondary" />,
      action: row => {
        const newArr = data.filter(el => el.id !== row.id);
        setData(newArr);
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

  const toggleEditableStatus = () => {
    setEditable(!editable);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[500]
      },
      secondary: {
        main: "#11cb5f"
      }
    },
    dragLineColor: "red",
    orderButtonColor: "pink"
  });

  return (
    <div
      style={{ height: "calc(100vh - 16px)", display: "flex", flexDirection: "column" }}
    >
      <div>
        <ToolBar
          {...{
            toggleEditableStatus,
            saveChanges,
            discardChanges,
            setDataToDisplay: setFilteredData,
            rowsData: data
          }}
        />
      </div>
      <div style={{ marginTop: 15, height: "calc(100% - 75px" }}>
        <O2xpDatatable
          rowsData={filteredData} // not required
          columnsData={columns} // required
          editable={editable} // not required
          theme={theme} // not required
        />
      </div>
      <div style={{ height: 30, width: "100%", border: "solid black 1px" }}></div>
    </div>
  );
};

export default defaultStory;
