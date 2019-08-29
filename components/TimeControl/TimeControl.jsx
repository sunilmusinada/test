import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./TimeControl.css";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { setTimeRanges } from "../../redux/actions/actions";
class TimeControl extends Component {
  state = {
    timeRanges: []
  };
  onChange = date => {
    this.props.dispatch(setTimeRanges(date));

    this.setState({ timeRanges: date });
  };

  componentDidMount() {
    let TimeRanges = this.props.TimeRanges;
    let yesterDay = new Date();
    yesterDay.setDate(yesterDay.getDate() - 1);
    if (typeof TimeRanges === "undefined" || TimeRanges.length < 2) {
      TimeRanges = [yesterDay, new Date()];
    }

    this.props.dispatch(setTimeRanges(TimeRanges));
    this.setState({ timeRanges: TimeRanges });
  }

  render() {
    const time = this.state.timeRanges;
    const enabled = !this.props.TimeControlState;
    if (typeof time === "undefined" || time.length < 2) {
      return <></>;
    }
    return (
      <div className="row">
        {/* <div className="form-group"> */}
        <div align="right" className="timeControl">
          <DateTimeRangePicker
            onChange={this.onChange}
            value={time}
            maxDate={new Date()}
            clearIcon={null}
            disabled={enabled}
          />
        </div>
      </div>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    TimeRanges: state.TimeRanges,
    TimeControlState: state.EnableTimeControl
  };
}
TimeControl.propTypes = {
  TimeRanges: PropTypes.array.isRequired,
  TimeControlState: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(TimeControl);
