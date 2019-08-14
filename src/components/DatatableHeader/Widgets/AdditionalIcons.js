import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, Zoom } from "@material-ui/core";
import { additionalIconsPropType } from "../../../proptypes";

class AdditionalIcons extends Component {
  render() {
    const { additionalIcons } = this.props;
    return (
      <Fragment>
        {additionalIcons.map((icon, i) => (
          <Tooltip
            key={icon.title}
            TransitionComponent={Zoom}
            title={icon.title}
          >
            <span>
              <IconButton
                className={
                  icon.disabled
                    ? `disabled-icon additional-icon-${i}`
                    : `additional-icon-${i}`
                }
                onClick={() => icon.onClick()}
                disabled={icon.disabled}
              >
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
