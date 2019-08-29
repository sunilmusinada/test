import React, { Component } from "react";
import { connect } from "react-redux";
import { DataTable } from "@scuf/datatable";
import PropTypes from "prop-types";
import "../../../../src/App.css";
import "../../../customcss/fontIcons.css";
import {
  getLoops,
  setSelectedHierarchyLoops
} from "../../../redux/actions/actions";
class AssetInformationTable extends Component {
  state = {};

  fetchLoops = () => {
    if (this.state.SelectedUnit === this.props.selectedUnit) return;
    this.props.dispatch(getLoops(this.props.selectedUnit));
    if (this.state.selectedRow !== "") this.setState({ selectedRow: [] });
    this.setState({ SelectedUnit: this.props.selectedUnit });
  };
  onSelectedLoopchange = e => {
    this.setState({ selectedRow: e });
    this.props.dispatch(setSelectedHierarchyLoops(e));
    // this.props.dispatch(setSelectedLoops(e));
  };
  render() {
    const loops = this.props.Loops;

    this.fetchLoops();
    return (
      <div className="row">
        <div className="col-md-12">
          <DataTable
            data={loops}
            search={true}
            selection={this.state.selectedRow}
            selectionMode="multiple"
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
          </DataTable>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    Loops: state.HierarchyLoops,
    selectedUnit: state.SelectedUnitInModal,

    Tabs: state.Tabs
  };
}
AssetInformationTable.propTypes = {
  Loops: PropTypes.array.isRequired,
  selectedUnit: PropTypes.string.isRequired,

  Tabs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(AssetInformationTable);
