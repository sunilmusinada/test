import { Chart } from "@scuf/charts";
import React, { Component } from "react";
import { format } from "date-fns";
import "./singlechart.css";
import { Loader } from "@scuf/common";
import axios from "axios";
class SingleChart extends Component {
  state = {
    SP: [],
    PV: [],
    OP: [],
    hasError: false,
    Loading: true
  };
  componentWillUnmount() {
    console.log("Chat unmounted");
  }
  componentDidMount() {
    const loopName = this.props.LoopName;

    const startTime = this.props.StartTime;
    const endTime = this.props.EndTime;
    this.fetchDataFromServer(loopName, startTime, endTime);
  }
  fetchDataFromServer = (Loops, startTime, endTime) => {
    var StartTime = format(startTime, "MM/DD/YYYY HH:mm:ss");
    var EndTime = format(endTime, "MM/DD/YYYY HH:mm:ss");
    const LoopSourceRequest = { Loops, StartTime, EndTime };

    axios
      .post(
        `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetLoopSourceData`,
        LoopSourceRequest
      )
      .then(respsonse => {
        const LoopData = respsonse.data;

        const PV = this.loopAndFormData(LoopData.PV);
        const SP = this.loopAndFormData(LoopData.SP);
        const OP = this.loopAndFormData(LoopData.OP);

        this.setState({ PV: PV, SP: SP, OP: OP, Loading: false });
      })
      .catch(error => {
        this.setState({ hasError: true, Loading: false });
      });
  };

  loopAndFormData = LoopDataObject => {
    let dataPointArray = [];
    Object.keys(LoopDataObject).forEach(element => {
      let points = [];
      let val = LoopDataObject[element];
      points.push(new Date(element));
      points.push(val);
      dataPointArray.push(points);
    });
    return dataPointArray;
  };

  render() {
    const loopName = this.props.LoopName;

    const PV = this.state.PV;
    const SP = this.state.SP;
    const OP = this.state.OP;
    if (this.state.hasError) {
      return this.renderErrorinChart();
    }

    if (this.state.Loading) {
      return this.renderLoader();
    }

    if (PV.length <= 0 || SP.length <= 0 || OP.length <= 0) return <></>;
    return (
      <Chart className="chart" hasTooltip={true} zoom="x">
        <Chart.Line name={`${loopName}.OPData`} data={OP} hideMarkers={true} />
        <Chart.Line name={`${loopName}.PVData`} data={PV} hideMarkers={true} />
        <Chart.Line name={`${loopName}.SPData`} data={SP} hideMarkers={true} />
        <Chart.Tooltip shared={true} valuePostfix="" />
        <Chart.XAxis timeseries={true} />
      </Chart>
    );
  }

  renderErrorinChart = () => {
    return <div>Failed to load the Chart.</div>;
  };

  renderLoader = () => {
    return (
      <Loader text="Loading chart">
        <div />
      </Loader>
    );
  };
}

export default SingleChart;
