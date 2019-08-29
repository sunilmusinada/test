import React, { Component } from "react";
import { DataTable } from "@scuf/datatable";
import { Button } from "@scuf/common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../src/App.css";
import "../../customcss/fontIcons.css";
import {
  getLoops,
  setSelectedTab,
  setSelectedLoops,
  finishedTab,
  setSelectedChart,
  resetState
} from "../../redux/actions/actions";
import "./definecase.css";

class DefineCase extends Component {
  constructor() {
    super();
    this.state = {
      SelectedUnit: "",
      selectedRow: null,
      selectedAll: false
    };
  }

  componentDidMount() {}

  IdentifyClusterclick = () => {
    this.props.dispatch(setSelectedTab("Identify Cluster"));
  };

  fetchLoops = () => {
    if (this.state.SelectedUnit === this.props.selectedUnit) return;
    this.props.dispatch(getLoops(this.props.selectedUnit));
    if (this.state.selectedRow !== "") this.setState({ selectedRow: [] });
    this.setState({ SelectedUnit: this.props.selectedUnit });
  };

  onSelectedLoopchange = e => {
    this.setState({ selectedRow: e });

    this.props.dispatch(setSelectedLoops(e));
  };
  renderShowChart = item => {
    return (
      <i
        className="fas fa-chart-line fa-2x"
        onClick={e => this.chartButtonClicked(e, item)}
      />
    );
  };
  chartButtonClicked = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
  };
  render() {
    const loops = this.props.Loops;

    this.fetchLoops();

    return (
      <div className="row">
        <div className="col-md-12">
          <DataTable
            data={loops}
            // selection={this.state.selectedRow}
            // selectionMode="multiple"
            scrollable={true}
            scrollHeight="680px"
            onSelectAll={e => this.setState({ selectedAll: e })}
            onSelectionChange={e => this.onSelectedLoopchange(e)}
            metaKeySelection={false}
          >
            <DataTable.Column
              field="LoopName"
              header="Loop Name"
              sortable={true}
            />
            <DataTable.Column
              field="Description"
              header="Description"
              sortable={true}
            />
            <DataTable.Column field="OI" header="OI,min" sortable={true} />
            <DataTable.Column
              field="PerformanceCategory"
              header="Performance Category"
              sortable={true}
            />
            {/* <DataTable.Column renderer={this.renderShowChart} /> */}
          </DataTable>
        </div>
        <div className="col-md-12">
          <Button
            className="identifyClusterButton"
            type="primary"
            size="small"
            content="Add"
            onClick={e => this.IdentifyClusterclick(e)}
          />
          <Button
            className="identifyClusterButton"
            type="primary"
            size="small"
            content="Identify Cluster"
            onClick={e => this.IdentifyClusterclick(e)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Loops: state.Loops,
    selectedUnit: state.SelectedUnit,
    SelectedLoops: state.SelectedLoops,
    Tabs: state.Tabs
  };
}
DefineCase.propTypes = {
  Loops: PropTypes.array.isRequired,
  selectedUnit: PropTypes.string.isRequired,
  SelectedLoops: PropTypes.array.isRequired,
  Tabs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(DefineCase);
