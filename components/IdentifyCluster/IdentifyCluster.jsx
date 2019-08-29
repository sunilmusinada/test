import React, { Component } from "react";
import ClusterDataTable from "../IdentifyCluster/ClusterDataTable";
import ClusterGraph from "./ClusterGraph";
import { Button } from "@scuf/common";
import {
  setSelectedTab,
  setIdentifyClusterLoading
} from "../../redux/actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ChartSelector from "./ChartSelector";
import "./identifyCluster.css";
import { ToggleTimeControl } from "./../../redux/actions/actions";
class IdentifyCluster extends Component {
  state = {};
  identifyRooCauseClick = () => {
    this.props.dispatch(setSelectedTab("RootCause Analysis Result"));
  };
  componentDidMount() {
    if (this.props.Clusters !== null) {
      this.props.dispatch(setIdentifyClusterLoading(false));
      return;
    }
    this.props.dispatch(setIdentifyClusterLoading(true));
    this.props.dispatch(ToggleTimeControl(false));
  }
  render() {
    return (
      <div className="row">
        <div>
          <div className="col-md-6 col-sm-5">
            <ClusterDataTable />
          </div>
          <div className="col-md-6 col-sm-7">
            <div className="row mainDiv">
              <div className="col-md-11" />
              <div className="col-md-1 mainDiv">
                <ChartSelector />
              </div>
            </div>
            <div className="clusterTable">
              <ClusterGraph />
            </div>
          </div>
          <div className="col-md-12">
            <Button
              className="identifyClusterButton"
              type="primary"
              content="Identify Root Cause"
              onClick={() => this.identifyRooCauseClick()}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Tabs: state.Tabs,
    Clusters: state.Clusters
  };
}
IdentifyCluster.propTypes = {
  Tabs: PropTypes.array.isRequired,
  Clusters: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(IdentifyCluster);
