import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { uniq } from "lodash";
import {
  IconButton,
  Tooltip,
  Zoom,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import {
  NumberType,
  TextType,
  BooleanType,
  DateType,
  TimeType,
  DateTimeType
} from "../../DatatableCore/CellTypes";
import { addNewRow as addNewRowAction } from "../../../redux/actions/datatableActions";
import {
  addNewRowPropType,
  columnsPropType,
  editingPropType,
  textPropType
} from "../../../proptypes";

export class Add extends Component {
  constructor(props) {
    super(props);
    const { columns } = props;
    const requiredVal = [];
    columns.forEach(col => {
      if (col.required) {
        requiredVal.push(col.id);
      }
    });
    this.state = {
      modalOpen: false,
      buttonDisabled: this.getDisabledButton({}, requiredVal, []),
      newRow: {},
      errors: [],
      requiredVal
    };
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
      newRow: {},
      errors: [],
      buttonDisabled: true
    });
  };

  getDisabledButton = (newRow, requiredVal, newErrors) => {
    let newButtonDisabled = newErrors.length > 0;
    requiredVal.forEach(rv => {
      if (!newRow[rv] || newRow[rv].length === 0) {
        newButtonDisabled = true;
      }
    });

    return newButtonDisabled;
  };

  send = () => {
    const { addNewRow } = this.props;
    const { newRow } = this.state;
    addNewRow(newRow);
    this.handleClose();
  };

  test = ({ columnId, newValue, error }) => {
    const { newRow, errors, requiredVal } = this.state;
    const newErrors = error
      ? uniq([columnId, ...errors])
      : errors.filter(err => err !== columnId);
    const nr = { ...newRow, [columnId]: newValue };

    this.setState({
      errors: newErrors,
      newRow: nr,
      buttonDisabled: this.getDisabledButton(nr, requiredVal, newErrors)
    });
  };

  buildForm = () => {
    const { columns } = this.props;
    const { newRow } = this.state;
    return columns
      .filter(column => !column.hiddenCreate)
      .map(column => {
        const {
          label,
          valueVerification,
          id,
          values = [],
          dateFormat = "",
          dataType = "",
          mask,
          required,
          inputType = undefined
        } = column;

        let properties = {
          cellVal: newRow[id] || "",
          editing: true,
          required,
          label,
          inputType,
          values,
          rowId: "",
          columnId: id,
          valueVerification,
          dateFormat,
          mask,
          setRowEdited: props => this.test(props)
        };

        let cellContent;

        switch (dataType) {
          case "number":
            properties = {
              ...properties,
              cellVal: newRow[id] || undefined
            };
            cellContent = NumberType(properties);
            break;
          case "boolean":
            cellContent = BooleanType(properties);
            break;
          case "date":
            cellContent = DateType(properties);
            break;
          case "time":
            cellContent = TimeType(properties);
            break;
          case "dateTime":
            cellContent = DateTimeType(properties);
            break;
          case "text":
          default:
            cellContent = TextType(properties);
            break;
        }

        return (
          <Grid
            container
            item
            xs={4}
            key={column.id}
            className={`new-row-${id}`}
          >
            {cellContent}
          </Grid>
        );
      });
  };

  render() {
    const { modalOpen, buttonDisabled } = this.state;
    const {
      editing,
      createText,
      createTitleText,
      createCancelText,
      createSubmitText
    } = this.props;

    return (
      <Fragment>
        <Tooltip TransitionComponent={Zoom} title={createText}>
          <span>
            <IconButton
              disabled={!editing}
              className={
                !editing ? `disabled-icon add-row-icon` : `add-row-icon`
              }
              onClick={() => this.setState({ modalOpen: true })}
            >
              <AddIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>
        <Dialog open={modalOpen} onClose={() => this.handleClose()}>
          <DialogTitle>{createTitleText}</DialogTitle>
          <DialogContent>
            <Grid container spacing={8}>
              {this.buildForm()}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose()}
              color="secondary"
              className="cancel"
            >
              {createCancelText}
            </Button>
            <Button
              className="create"
              disabled={buttonDisabled}
              onClick={() => this.send()}
              color="primary"
              autoFocus
              variant="contained"
            >
              {createSubmitText}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns,
    createText: state.textReducer.create,
    createTitleText: state.textReducer.createTitle,
    createCancelText: state.textReducer.createCancel,
    createSubmitText: state.textReducer.createSubmit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewRow: row => dispatch(addNewRowAction(row))
  };
};

Add.propTypes = {
  addNewRow: addNewRowPropType,
  columns: columnsPropType,
  editing: editingPropType,
  createText: textPropType,
  createTitleText: textPropType,
  createCancelText: textPropType,
  createSubmitText: textPropType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
