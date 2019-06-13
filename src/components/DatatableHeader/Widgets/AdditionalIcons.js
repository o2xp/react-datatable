import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { additionalIconsPropType } from "../../../proptypes";

class AdditionalIcons extends Component {
  render() {
    const { additionalIcons } = this.props;
    return (
      <Fragment>
        {additionalIcons.map(icon => (
          <Tooltip
            key={icon.title}
            TransitionComponent={Zoom}
            title={icon.title}
          >
            <span>
              <IconButton onClick={() => icon.onClick()}>
                {icon.icon}
              </IconButton>
            </span>
          </Tooltip>
        ))}
      </Fragment>
    );
  }
}

AdditionalIcons.propTypes = {
  additionalIcons: additionalIconsPropType.isRequired
};

const mapStateToProps = state => {
  return {
    additionalIcons: state.datatableReducer.features.additionalIcons
  };
};

export default connect(mapStateToProps)(AdditionalIcons);
