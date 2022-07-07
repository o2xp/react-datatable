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
  isScrollingPropType,
  areSearchFieldsDisplayedPropType
} from "../../../proptypes";
import { orderByColumns as orderByColumnsAction } from "../../../redux/actions/datatableActions";
import HeaderColumnsSearchBar from "./HeaderColumnsSearchBar";

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
    const {
      width,
      column,
      canOrderColumns,
      areSearchFieldsDisplayed
    } = this.props;
    const content = canOrderColumns
      ? this.buildButton(column, width)
      : column.label;

    let wrapperType;
    switch (column.dataType) {
      case "number":
        wrapperType = (
          <NumberWrapper style={{ width }}>{content}</NumberWrapper>
        );
        break;
      case "text":
        wrapperType = <TextWrapper style={{ width }}>{content}</TextWrapper>;
        break;
      case "boolean":
        wrapperType = (
          <BooleanWrapper style={{ width }}>{content}</BooleanWrapper>
        );
        break;
      case "date":
        wrapperType = <DateWrapper style={{ width }}>{content}</DateWrapper>;
        break;
      case "time":
        wrapperType = <TimeWrapper style={{ width }}>{content}</TimeWrapper>;
        break;
      case "dateTime":
        wrapperType = (
          <DateTimeWrapper style={{ width }}>{content}</DateTimeWrapper>
        );
        break;
      default:
        wrapperType = <TextWrapper style={{ width }}>{content}</TextWrapper>;
        break;
    }

    // TODO: déplacer les searchbars ici
    return (
      <>
        {wrapperType}
        {areSearchFieldsDisplayed ? (
          <HeaderColumnsSearchBar column={column} />
        ) : null}
      </>
    );
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
  dragText: textPropType,
  areSearchFieldsDisplayed: areSearchFieldsDisplayedPropType
};

const mapDispatchToProps = dispatch => {
  return {
    orderByColumns: col => dispatch(orderByColumnsAction(col))
  };
};

const mapStateToProps = state => {
  return {
    canOrderColumns: state.datatableReducer.features.canOrderColumns,
    areSearchFieldsDisplayed: state.datatableReducer.areSearchFieldsDisplayed,
    orderBy: state.datatableReducer.orderBy,
    orderByText: state.textReducer.orderBy,
    dragText: state.textReducer.drag,
    isScrolling: state.datatableReducer.dimensions.isScrolling
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCell);
