import React, { Component } from "react";
import HierarchyTree from "../hierarchytree/HierarchyTree";
import DefineCase from "./../Case/DefineCase";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../src/App.css";
import "../../customcss/fontIcons.css";
//import ClusterDataTable from "../IdentifyCluster/ClusterDataTable";
import RootCauseResult from "./../RootCauseResult/RootCauseResult";
import IdentifyCluster from "../IdentifyCluster/IdentifyCluster";
import CaseCard from "./../CaseCard/casecard";
import Cases from "./../CaseCard/Cases";
class StepperBody extends Component {
  state = {};

  render() {
    const _selectedTab = this.props.SelectedTab;
    const comp =
      _selectedTab === "Define case" ? (
        <div className="row">
          <div className="col-sm-2 col-md-2">
            <HierarchyTree />
          </div>
          <div className="col-sm-10 col-md-10">
            <div>
              <Cases />
            </div>
          </div>
        </div>
      ) : _selectedTab === "Identify Cluster" ? (
        <IdentifyCluster />
      ) : (
        <RootCauseResult />
      );
    return <div className="col-md-12">{comp}</div>;
  }
}

function mapStateToProps(state) {
  return {
    SelectedTab: state.SelectedTab
  };
}
StepperBody.propTypes = {
  SelectedTab: PropTypes.string.isRequired
};
export default connect(mapStateToProps)(StepperBody);
