import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { counter, dispatch } = this.props;
    return (
      <div>
        {counter}
        <button type="button" onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment +1
        </button>
        <button type="button" onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement -1
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counterReducer.counter
  };
};

Datatable.propTypes = {
  counter: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Datatable);
