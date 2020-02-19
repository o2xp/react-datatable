import React, { Component } from "react";
import { sortableElement } from "react-sortable-hoc";
import { Tooltip, Zoom } from "@material-ui/core";
import { ArrowUpward as ArrowIcon } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  NumberWrapper,
  TextWrapper,
  BooleanWrapper,
  DateWrapper,
  TimeWrapper,
  DateTimeWrapper
} from "../CellTypes";
import {
  columnPropType,
  widthPropType,
  indexPropType,
  orderByColumnsPropType,
  orderByPropType,
  canOrderColumnsPropType,
  textPropType
} from "../../../proptypes";
import { orderByColumns as orderByColumnsAction } from "../../../redux/actions/datatableActions";

export class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childButtonHovered: false
    };
  }

  setHover = bool => {
    this.setState({ childButtonHovered: bool });
  };

  buildButton = column => {
    const { orderByColumns, orderBy, orderByText } = this.props;
    const index = orderBy.findIndex(el => el.id === column.id);

    let orderElement;
    if (index !== -1) {
      orderElement = orderBy[index];
    }

    return (
      <div className="cell-header">
        <Tooltip TransitionComponent={Zoom} title={orderByText}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <button
              type="button"
              className="button-header"
              onMouseOver={() => this.setHover(true)}
              onMouseLeave={() => this.setHover(false)}
              onFocus={() => null}
              onClick={e => {
                e.stopPropagation();
                orderByColumns(column.id);
              }}
            >
              {column.label}
            </button>
            <div
              style={{ display: "flex", alignItems: "center", width: "32px" }}
            >
              {orderElement && (
                <>
                  <ArrowIcon
                    className={
                      orderElement.value === "asc" ? "ascIcon" : "descIcon"
                    }
                  />
                  {index + 1}
                </>
              )}
            </div>
          </span>
        </Tooltip>
      </div>
    );
  };

  buildHeaderCell = () => {
    const { width, column, canOrderColumns } = this.props;
    const content = canOrderColumns ? this.buildButton(column) : column.label;
    switch (column.dataType) {
      case "number":
        return <NumberWrapper style={{ width }}>{content}</NumberWrapper>;
      case "text":
        return <TextWrapper style={{ width }}>{content}</TextWrapper>;
      case "boolean":
        return <BooleanWrapper style={{ width }}>{content}</BooleanWrapper>;
      case "date":
        return <DateWrapper style={{ width }}>{content}</DateWrapper>;
      case "time":
        return <TimeWrapper style={{ width }}>{content}</TimeWrapper>;
      case "dateTime":
        return <DateTimeWrapper style={{ width }}>{content}</DateTimeWrapper>;
      default:
        return <TextWrapper style={{ width }}>{content}</TextWrapper>;
    }
  };

  render() {
    const { index, dragText } = this.props;
    const { childButtonHovered } = this.state;
    return (
      <SortableItem
        dragText={dragText}
        index={index}
        value={this.buildHeaderCell()}
        childButtonHovered={childButtonHovered}
      />
    );
  }
}

const SortableItem = sortableElement(
  ({ value, childButtonHovered, dragText }) => (
    <Tooltip
      TransitionComponent={Zoom}
      title={childButtonHovered ? "" : dragText}
    >
      <div
        className={
          childButtonHovered
            ? "Table-Header-Cell-Child-Hovered"
            : "Table-Header-Cell"
        }
      >
        {value}
      </div>
    </Tooltip>
  )
);

HeaderCell.propTypes = {
  column: columnPropType.isRequired,
  width: widthPropType.isRequired,
  index: indexPropType.isRequired,
  orderBy: orderByPropType.isRequired,
  canOrderColumns: canOrderColumnsPropType.isRequired,
  orderByColumns: orderByColumnsPropType,
  orderByText: textPropType,
  dragText: textPropType
};

const mapDispatchToProps = dispatch => {
  return {
    orderByColumns: col => dispatch(orderByColumnsAction(col))
  };
};

const mapStateToProps = state => {
  return {
    canOrderColumns: state.datatableReducer.features.canOrderColumns,
    orderBy: state.datatableReducer.orderBy,
    orderByText: state.textReducer.orderBy,
    dragText: state.textReducer.drag
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderCell);
