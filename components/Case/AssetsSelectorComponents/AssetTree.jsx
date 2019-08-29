import React, { Component } from "react";
import { Tree } from "@scuf/common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../../src/App.css";
import "../../../customcss/fontIcons.css";
import {
  setAssets,
  SetSelectedUnitInModal,
  getCasesforUnit
} from "../../../redux/actions/actions";

class AssetTree extends Component {
  componentDidMount() {
    this.props.dispatch(setAssets());
  }

  onNodeClick = item => {
    item.active = true;
    if (item.EquipmentType !== "Production Unit") return;
    const selectedAsset = item.Title;
    this.props.dispatch(SetSelectedUnitInModal(selectedAsset));
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
    selectedAsset: state.SelectedUnitInModal,
    AllAssets: state.AllAssets
  };
}
AssetTree.propTypes = {
  selectedAsset: PropTypes.string.isRequired,
  AllAssets: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(AssetTree);
