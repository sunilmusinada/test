import React from "react";
import { Tree } from "@scuf/common";
export function ConvertAssets(Assets) {
  const ResultAssets = [];
  Assets.array.forEach(element => {
    const asset = {};
  });
}

export function filterTreeData(Assets, selectedAsset, nodeClick) {
  const Item = Tree.Content.Item;
  if (
    Assets === undefined ||
    Assets.length === 0 ||
    (Object.keys(Assets).length === 0 && Assets.constructor === Object)
  ) {
    return;
  }
  const filteredAssets = Assets.filter(
    e =>
      e.EquipmentType !== "Standalone Controller" &&
      e.EquipmentType !== "Cascade Controller"
  );
  console.log("filteredAssets", filteredAssets);
  const HierarchyAssets = filteredAssets.map(e => (
    <Item
      key={e.EquipmentId}
      title={e.Title}
      // icon="icon-Unit"
      expanded={true}
      onClick={e => nodeClick(e)}
      active={e.Title === selectedAsset}
    >
      {filterTreeData(e.ChildItems)}
    </Item>
  ));

  return HierarchyAssets;
}
