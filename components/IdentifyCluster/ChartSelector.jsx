import "@fortawesome/fontawesome-free/css/all.css";
import "./ChartSelector.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSelectedChart } from "../../redux/actions/actions";
class ChartSelector extends Component {
  state = {};

  onIconClick = chartName => {
    this.props.dispatch(setSelectedChart(chartName));
  };

  render() {
    const selectedChart = this.props.SelectedChart;
    let lineChartClass = "fas fa-chart-line selector-chart";
    let barChartClass = "fas fa-chart-bar selector-chart";

    if (selectedChart === "Bar") {
      barChartClass = "fas fa-chart-bar fa-chart-bar-selected selector-chart";
      lineChartClass = "fas fa-chart-line selector-chart";
    } else {
      lineChartClass =
        "fas fa-chart-line fa-chart-line-selected selector-chart";
      barChartClass = "fas fa-chart-bar selector-chart";
    }

    return (
      <div className="row mainDiv">
        <div className="col-md-6">
          <i
            className={lineChartClass}
            onClick={() => this.onIconClick("Line")}
          />
        </div>
        <div className="col-md-6">
          <i
            className={barChartClass}
            onClick={() => this.onIconClick("Bar")}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    SelectedChart: state.SelectedChart
  };
}
ChartSelector.propTypes = {
  SelectedChart: PropTypes.string.isRequired,

  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ChartSelector);
