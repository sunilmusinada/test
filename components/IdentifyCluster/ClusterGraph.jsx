import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import SingleChart from "./SingleChart";
import { getSelectedCluster } from "../../redux/actions/actions";
import LollipopChart from "./LollipopChart";
class ClusterGraph extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getSelectedCluster());
  }

  componentWillUnmount() {}

  findLoopPowerDetails = (PowerDetails, SelectedCluster) => {
    let loopArray = [];
    const clusterLoops = SelectedCluster.ClusterLoops.split(",");
    const osciPeriod = SelectedCluster.OscilationPeriod;
    clusterLoops.forEach(element => {
      let valArray = [];

      const val = PowerDetails.find(e => e.LoopName === element);

      val.TimeinMins.forEach((ele, index) => {
        valArray.push({
          count: val.Power[index],
          codon: ele,
          tooltip: {
            header: `power ${val.Power[index].toFixed(4)}`,
            body: `Osci period ${ele.toFixed(4)}`
          },
          selected: true,
          color:
            ele.toFixed(4) === osciPeriod.toFixed(4) ? "#1BB5F3" : "#E3EDF1"
        });
      });
      let loop = { LoopName: element, valArray };
      loopArray.push(loop);
    });
    return loopArray;
  };
  renderLollipop = (selectedclusterforChart, loops, TimeMax, powerMax) => {
    return (
      <div>
        <p>Selected cluster :{selectedclusterforChart}</p>
        {loops.map(e => (
          <div key={e.LoopName} className="row">
            <LollipopChart
              key={e.LoopName}
              graphData={e.valArray}
              LoopName={e.LoopName}
              xMax={Math.ceil(TimeMax + 10)}
              yMax={Math.ceil(powerMax)}
            />
          </div>
        ))}
      </div>
    );
  };
  renderLine = (selectedclusterforChart, selectedCluster) => {
    return (
      <div>
        <p>Selected cluster :{selectedclusterforChart}</p>
        {selectedCluster.ClusterLoopInfo.map(e => (
          <div key={e.LoopName} className="row">
            <SingleChart
              key={e.LoopName}
              LoopName={e.LoopName}
              StartTime={this.props.TimeRanges[0]}
              EndTime={this.props.TimeRanges[1]}
            />
          </div>
        ))}
      </div>
    );
  };
  render() {
    const clusters = this.props.Clusters;
    const selectedclusterforChart = this.props.SelectedClusterForChart;
    if (
      selectedclusterforChart === "" ||
      selectedclusterforChart === undefined ||
      clusters === null ||
      clusters === undefined ||
      clusters.LoopClusterDetails === undefined ||
      clusters.LoopClusterDetails === null
    )
      return <div />;
    const selectedCluster = clusters.LoopClusterDetails.find(
      e => e.ClusterName === this.props.SelectedClusterForChart
    );
    const selectedChart = this.props.SelectedChart;

    const loopPowerDetails = this.props.Clusters.LoopPowerPeriodDetails;
    var loops = this.findLoopPowerDetails(loopPowerDetails, selectedCluster);
    let powerMax = 0;
    let TimeMax = 0;

    loops.forEach((ele, index) => {
      const loopElement = ele.valArray;
      // const timeVals = loopElement.map(e => e.codon);
      // const maxTimeValsArray = Math.max.apply(null, timeVals);
      // const appearedmoreThanOnce = maxTimeValsArray.filter(
      //   item => item == maxValueInTimeArray
      // ).length;
      // console.log("appearedmoreThanOnce", appearedmoreThanOnce);
      loopElement.forEach((val, ind) => {
        if (powerMax < val.count) powerMax = val.count;
        if (TimeMax < val.codon) TimeMax = val.codon;
      });
    });
    let codonArray = [];
    loops.forEach(element => {
      codonArray.push(element.valArray.map(e => e.codon));
    });

    if (selectedChart === "Bar") {
      return this.renderLollipop(
        selectedclusterforChart,
        loops,
        TimeMax,
        powerMax
      );
    }
    if (selectedChart === "Line") {
      return this.renderLine(selectedclusterforChart, selectedCluster);
    }
  }
}

function mapStateToProps(state) {
  return {
    Clusters: state.Clusters,
    SelectedChart: state.SelectedChart,
    SelectedClusterForChart: state.SelectedClusterForChart,
    TimeRanges: state.TimeRanges
  };
}
ClusterGraph.propTypes = {
  Clusters: PropTypes.object,
  SelectedChart: PropTypes.string.isRequired,
  SelectedClusterForChart: PropTypes.string.isRequired,
  TimeRanges: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ClusterGraph);
