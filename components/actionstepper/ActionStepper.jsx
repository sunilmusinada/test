import { Stepper } from "@scuf/common";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../actionstepper/actionstepper.css";
import {
  setSelectedTab,
  resetState,
  setIdentifyClusterLoading
} from "../../redux/actions/actions";
//import * as HierarchyActions from "../../redux/actions/hierarchyAction";

class ActionStepper extends Component {
  stepClicked = selectedTab => {
    if (selectedTab.Name === "Define case") {
      this.props.dispatch(setSelectedTab(selectedTab.Name));
      this.props.dispatch(resetState());
    } else if (selectedTab.Name === "Identify Cluster") {
      this.props.dispatch(setSelectedTab(selectedTab.Name));
    }
  };
  renderStepperItems = Tabs => {
    const selectedTab = this.props.SelectedTab;

    return Tabs.map(tab => (
      <Stepper.Item
        key={tab.Name}
        title={tab.Name}
        description={tab.description}
        active={tab.Name === selectedTab}
        onClick={() => this.stepClicked(tab)}
      />
    ));
  };
  render() {
    const Tabs = this.props.Tabs;

    return (
      <Stepper ordered={true} fluid={true} className="steperView">
        {" "}
        {this.renderStepperItems(Tabs)}
      </Stepper>
    );
  }
}
function mapStateToProps(state) {
  return {
    Tabs: state.Tabs,
    SelectedTab: state.SelectedTab
  };
}
ActionStepper.propTypes = {
  Tabs: PropTypes.array.isRequired,
  SelectedTab: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ActionStepper);
