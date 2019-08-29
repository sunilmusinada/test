import React, { Component } from "react";
import { DataTable } from "@scuf/datatable";
import CircularProgress from "../../common/Progress/CircularProgress";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../src/App.css";
import "../../customcss/fontIcons.css";
import "./identifyCluster.css";
import {
  getClusters,
  setSelectedClusters,
  setSelectedClusterforChart,
  getTimeRanges,
  setIdentifyClusterLoading
} from "../../redux/actions/actions";
import { Button } from "@scuf/common";
import "@fortawesome/fontawesome-free/css/all.css";
class ClusterDataTable extends Component {
  constructor() {
    super();
    this.state = {
      selectedRow: null,
      selectedLoops: []
    };
  }
  render() {
    const loading = this.props.Loading;

    return this.renderer(loading);
  }

  renderer = (loading, clusters) => {
    if (loading) {
      return this.showLoading();
    } else return this.renderContent();
  };

  showLoading = () => {
    return <CircularProgress />;
  };
  renderShowChart = item => {
    return (
      <a className="btn" href="#">
        {" "}
        <i
          className="fas fa-chart-line fa-2x"
          onClick={e => this.chartButtonClicked(e, item)}
        />
      </a>
    );
  };
  chartButtonClicked = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch(setSelectedClusterforChart(item.rowData.ClusterName));
  };
  renderContent = () => {
    if (this.props.Clusters.LoopClusterDetails === null)
      return this.renderTable(null);
    const clusterLoopDetails = this.props.Clusters.LoopClusterDetails.map(
      e => e
    );
    return this.renderTable(clusterLoopDetails);
  };

  renderTable = clusterLoopDetails => {
    return (
      <div className="row clusterTable">
        <p>Select one to Identify the Cluster</p>
        <div className="col-md-12">
          <DataTable
            data={clusterLoopDetails}
            selection={this.state.selectedRow}
            selectionMode="multiple"
            onSelectionChange={e => this.onSelectedClusterchange(e)}
            metaKeySelection={false}
          >
            <DataTable.Column
              field="ClusterName"
              header="Clusters"
              sortable={true}
            />

            <DataTable.Column field="ClusterLoops" header="Controllers" />
            <DataTable.Column
              field="OscilationPeriod"
              header="Oscillation Period, Min"
            />
            <DataTable.Column renderer={this.renderShowChart} />
          </DataTable>
        </div>
      </div>
    );
  };
  componentWillMount() {
    this.props.dispatch(getTimeRanges());
  }
  onSelectedClusterchange = e => {
    this.setState({ selectedRow: e });
    this.props.dispatch(setSelectedClusters(e));
  };
  fetchClusters() {
    this.props.dispatch(
      getClusters(
        this.props.SelectedLoops,
        this.props.TimeRanges[0],
        this.props.TimeRanges[1]
      )
    );
  }
  componentDidMount() {
    if (this.props.Clusters !== null) {
      //  this.props.dispatch(setIdentifyClusterLoading(false));
      return;
    }
    console.log("clusters", this.props.SelectedLoops);
    this.props.dispatch(
      getClusters(
        this.props.SelectedLoops,
        this.props.TimeRanges[0],
        this.props.TimeRanges[1]
      )
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.SelectedLoops !== nextProps.SelectedLoops;
  // }
}

function mapStateToProps(state) {
  return {
    Clusters: state.Clusters,
    selectedUnit: state.SelectedUnit,
    SelectedLoops: state.SelectedLoops,
    TimeRanges: state.TimeRanges,
    Loading: state.IdentifyClusterLoading
  };
}
ClusterDataTable.propTypes = {
  Clusters: PropTypes.object,
  SelectedLoops: PropTypes.array.isRequired,
  Loading: PropTypes.bool.isRequired,
  TimeRanges: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ClusterDataTable);
