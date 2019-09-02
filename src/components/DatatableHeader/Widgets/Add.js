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
  editingPropType
} from "../../../proptypes";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      newRow: {},
      errors: []
    };
  }

  handleClose = () => {
    this.setState({ modalOpen: false, newRow: {}, errors: [] });
  };

  send = () => {
    const { addNewRow } = this.props;
    const { newRow } = this.state;
    addNewRow(newRow);
    this.handleClose();
  };

  test = ({ columnId, newValue, error }) => {
    const { newRow, errors } = this.state;
    const newErrors = error
      ? uniq([columnId, ...errors])
      : errors.filter(err => err !== columnId);

    this.setState({
      errors: newErrors,
      newRow: { ...newRow, [columnId]: newValue }
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
          inputType = undefined
        } = column;

        let properties = {
          cellVal: newRow[id] || "",
          editing: true,
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
          <Grid container item xs={4} key={column.id}>
            {cellContent}
          </Grid>
        );
      });
  };

  render() {
    const { modalOpen, errors } = this.state;
    const { editing } = this.props;

    return (
      <Fragment>
        <Tooltip TransitionComponent={Zoom} title="Create">
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
          <DialogTitle>Create a new row</DialogTitle>
          <DialogContent>
            <Grid container spacing={8}>
              {this.buildForm()}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="secondary">
              Cancel
            </Button>
            <Button
              disabled={errors.length > 0}
              onClick={() => this.send()}
              color="primary"
              autoFocus
              variant="contained"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns
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
  editing: editingPropType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
