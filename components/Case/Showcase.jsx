import React, { Component } from "react";
import { DataTable } from "@scuf/datatable";
import { Button } from "@scuf/common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../src/App.css";
import "../Case/definecase.css";
import "../../customcss/fontIcons.css";
import _ from "lodash";
import {
  getAttributesForLoops,
  setSelectedTab,
  setSelectedLoops,
  setHierarcyLoops
} from "../../redux/actions/actions";
import AssetModal from "./AssetsSelectorComponents/AssetModal";

import { ModalOpened } from "./../../redux/actions/actions";

class Showcase extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch(
      getAttributesForLoops(
        this.props.SelectedLoops,
        this.props.TimeRanges[0],
        this.props.TimeRanges[1]
      )
    );
  }

  IdentifyClusterclick = () => {
    this.props.dispatch(setSelectedTab("Identify Cluster"));
  };
  addAssets = () => {
    this.props.dispatch(ModalOpened(true));
  };
  deleteClicked = e => {
    console.log(e.target, "deleted");
  };
  renderDeleteButton = e => {
    console.log(e.target, "deleted");
    return (
      <Button
        content="Delete"
        type="inline-secondary"
        onClick={e => this.deleteClicked(e)}
      />
    );
  };
  onSelectedLoopchange = e => {
    this.setState({ selectedItems: e });
  };

  onDeleteLoops = () => {
    const newLoops = _.difference(
      this.props.HierarchyLoops,
      this.state.selectedItems
    );
    console.log("OnDelete");
    this.props.dispatch(setHierarcyLoops(newLoops));
    const loopNames = newLoops.map(e => e.LoopName);
    this.props.dispatch(setSelectedLoops(loopNames));
  };
  renderTable = loops => {
    return (
      <div className="row">
        <div className="col-md-12">
          <DataTable
            data={loops}
            scrollable={true}
            selectionMode="multiple"
            selection={this.state.selectedItems}
            scrollHeight="500px"
            onSelectAll={e => this.setState({ selectedAll: e })}
            onSelectionChange={e => this.onSelectedLoopchange(e)}
            metaKeySelection={false}
          >
            <DataTable.ActionBar>
              <DataTable.ActionBar.Item
                icon="delete"
                iconSize="small"
                content="Delete"
                onClick={() => this.onDeleteLoops()}
              />
            </DataTable.ActionBar>
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
              header="Performance Rating"
              sortable={true}
            />{" "}
            //
          </DataTable>
        </div>
        <div className="col-md-12">
          <Button
            className="identifyClusterButton"
            type="primary"
            size="small"
            content="Identify Cluster"
            onClick={e => this.IdentifyClusterclick()}
            style={"min-width: auto"}
          />
          <span />
          <Button
            className="identifyClusterButton"
            type="primary"
            size="small"
            content="Add"
            onClick={e => this.addAssets()}
            style={"marign-right:10px"}
          />
        </div>
      </div>
    );
  };
  renderAssetModal = () => {
    return (
      <div className="row">
        <div className="center-block">
          <AssetModal />
        </div>
      </div>
    );
  };
  render() {
    const loops = this.props.HierarchyLoops;
    const modalState = this.props.ModalOpened;
    return modalState ? this.renderAssetModal() : this.renderTable(loops);
  }
}
function mapStateToProps(state) {
  return {
    selectedUnit: state.SelectedUnit,
    SelectedLoops: state.SelectedLoops,
    HierarchyLoops: state.HierarchyLoops,
    TimeRanges: state.TimeRanges,
    ModalOpened: state.ModalOpened,
    Tabs: state.Tabs
  };
}
Showcase.propTypes = {
  selectedUnit: PropTypes.string.isRequired,
  SelectedLoops: PropTypes.array.isRequired,
  Tabs: PropTypes.array.isRequired,
  HierarchyLoops: PropTypes.array,
  TimeRanges: PropTypes.array.isRequired,
  ModalOpened: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(Showcase);
