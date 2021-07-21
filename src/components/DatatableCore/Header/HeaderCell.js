import React, { Component } from "react";
import { sortableElement } from "react-sortable-hoc";
import { Tooltip, Zoom, Grid } from "@material-ui/core";
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
  textPropType,
  stylePropType,
  isLastLockedPropType,
  isScrollingPropType
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

  buildButton = (column, width) => {
    const { orderByColumns, orderBy, orderByText } = this.props;
    const index = orderBy.findIndex(el => el.id === column.id);

    let orderElement;
    if (index !== -1) {
      orderElement = orderBy[index];
    }

    return (
      <Tooltip arrow TransitionComponent={Zoom} title={orderByText}>
        <Grid
          className="cell-header"
          container
          style={{ width }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={orderElement ? 8 : 12}>
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
          </Grid>
          {orderElement && (
            <Grid
              container
              item
              xs={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ArrowIcon
                  className={
                    orderElement.value === "asc" ? "ascIcon" : "descIcon"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                {index + 1}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Tooltip>
    );
  };

  buildHeaderCell = () => {
    const { width, column, canOrderColumns } = this.props;
    const content = canOrderColumns
      ? this.buildButton(column, width)
      : column.label;
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
    const {
      index,
      dragText,
      style,
      locked,
      isLastLocked,
      isScrolling
    } = this.props;
    const { childButtonHovered } = this.state;

    let className = "";
    switch (true) {
      case isLastLocked && isScrolling:
        className = `scrolling-shadow`;
        break;
      case isLastLocked && !isScrolling:
        className = ` no-scrolling-shadow`;
        break;
      default:
        className = ``;
        break;
    }

    return (
      <>
        {locked ? (
          <div
            style={style}
            className={
              childButtonHovered
                ? `Table-Header-Cell-Child-Hovered ${className}`
                : `Table-Header-Cell ${className}`
            }
          >
            {this.buildHeaderCell()}
          </div>
        ) : (
          <SortableItem
            dragText={dragText}
            index={index}
            value={this.buildHeaderCell()}
            childButtonHovered={childButtonHovered}
          />
        )}
      </>
    );
  }
}

const SortableItem = sortableElement(
  ({ value, childButtonHovered, dragText, style }) => (
    <Tooltip
      arrow
      TransitionComponent={Zoom}
      title={childButtonHovered ? "" : dragText}
    >
      <div
        className={
          childButtonHovered
            ? "Table-Header-Cell-Child-Hovered"
            : "Table-Header-Cell"
        }
        style={style}
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
  style: stylePropType,
  isScrolling: isScrollingPropType.isRequired,
  isLastLocked: isLastLockedPropType,
  locked: isLastLockedPropType,
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
    dragText: state.textReducer.drag,
    isScrolling: state.datatableReducer.dimensions.isScrolling
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCell);
