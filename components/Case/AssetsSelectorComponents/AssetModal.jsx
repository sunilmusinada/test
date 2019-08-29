import React, { Component } from "react";
import { Modal, Button } from "@scuf/common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ModalOpened, setSelectedLoops } from "../../../redux/actions/actions";
import HierarchyTree from "../../hierarchytree/HierarchyTree";
import AssetTree from "./AssetTree";
import DefineCase from "./../DefineCase";
import AssetInformationTable from "./AssetInformationTable";
import "../AssetsSelectorComponents/AssetModal.css";
class AssetModal extends Component {
  state = {
    open: true
  };
  onCloseClick = () => {
    this.props.dispatch(ModalOpened(false));
    this.setState({ open: false });
  };
  onAddClick = () => {
    var totalLoops = [
      ...new Set([...this.props.Loops, ...this.props.SelectedLoops])
    ];
    console.log("totalLoops", totalLoops);
    this.props.dispatch(setSelectedLoops(totalLoops));
    this.props.dispatch(ModalOpened(false));
    this.setState({ open: false });
  };
  render() {
    return (
      <Modal
        closeIcon={true}
        onClose={() => this.onCloseClick()}
        open={this.state.open}
        closeOnDimmerClick={false}
        size="large"
        className="AddAssetModal"
      >
        <Modal.Header>
          <h1>Add loops to the case</h1>
        </Modal.Header>
        <Modal.Content>
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <AssetTree />
            </div>
            <div className="col-md-9 col-lg-9">
              <AssetInformationTable />
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="row">
            <div className="col">
              <div>
                <Button
                  className="ModalButton"
                  content="Close"
                  type="primary"
                  onClick={() => this.onCloseClick()}
                />
                <span />

                <Button
                  className="ModalButton"
                  content="Add"
                  type="primary"
                  onClick={() => this.onAddClick()}
                />
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    Loops: state.SelectedLoops,
    selectedUnit: state.SelectedUnit,
    SelectedLoops: state.SelectedHierarchyLoops,
    ModalOpened: state.ModalOpened
  };
}
AssetModal.propTypes = {
  Loops: PropTypes.array.isRequired,
  selectedUnit: PropTypes.string.isRequired,
  SelectedLoops: PropTypes.array.isRequired,
  Loops: PropTypes.array.isRequired,
  ModalOpened: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(AssetModal);
