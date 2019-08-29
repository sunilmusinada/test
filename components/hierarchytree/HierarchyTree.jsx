import React, { Component } from "react";
import { Tree } from "@scuf/common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../src/App.css";
import "../../customcss/fontIcons.css";
import {
  setAssets,
  setSelectedUnit,
  getCasesforUnit,
  getLoops
} from "../../redux/actions/actions";
import { resetState } from "./../../redux/actions/actions";

class HiearchyTree extends Component {
  componentDidMount() {
    this.props.dispatch(setAssets());
  }

  onNodeClick = item => {
    item.active = true;
    if (item.EquipmentType !== "Production Unit") return;
    const selectedAsset = item.Title;
    this.props.dispatch(setSelectedUnit(selectedAsset));
    this.props.dispatch(getCasesforUnit(selectedAsset));
    this.props.dispatch(getLoops(selectedAsset));
  };

  GetTreeData = Assets => {
    const Item = Tree.Content.Item;
    if (
      Assets === undefined ||
      (Object.keys(Assets).length === 0 && Assets.constructor === Object)
    )
      return;
    const filteredAssets = Assets.filter(
      e =>
        e.EquipmentType !== "Standalone Controller" &&
        e.EquipmentType !== "Cascade Controller" &&
        e.EquipmentType !== "INSTRUMENT"
    );

    const HierarchyAssets = filteredAssets.map(e => (
      <Item
        key={e.EquipmentId}
        title={e.Title}
        // icon="icon-Unit"
        expanded={true}
        onClick={() => this.onNodeClick(e)}
        active={e.Title === this.props.selectedAsset}
      >
        {this.GetTreeData(e.ChildItems)}
      </Item>
    ));

    return HierarchyAssets;
  };

  render() {
    const Assets = this.props.AllAssets;

    return (
      <div className="treeContainer">
        <Tree className="treeView">
          <Tree.Header title="Asset hierarchy" />
          <Tree.Content>{this.GetTreeData(Assets)}</Tree.Content>
        </Tree>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    AllAssets: state.AllAssets,
    selectedAsset: state.SelectedUnit
  };
}
HiearchyTree.propTypes = {
  AllAssets: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(HiearchyTree);
