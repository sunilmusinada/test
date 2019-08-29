import React, { Component } from "react";
import { DataTable } from "@scuf/datatable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../src/App.css";
import "../../customcss/fontIcons.css";
import {
  getRootCause,
  saveRootCause,
  SaveAsClicked
} from "../../redux/actions/actions";
import CircularProgress from "../../common/Progress/CircularProgress";
import { ToggleTimeControl } from "./../../redux/actions/actions";
import { Button } from "@scuf/common";
import "../RootCauseResult/Rootcause.css";
import CaseSaveAs from "./CaseSaveAs";
import _ from "lodash";
//import NotificationRCA from "../../common/Notification/NotificationRCA";
import SnackBarNotification from "../../common/Notification/SnackBarNotification";
//import CustomizedSnackbar from "./../../common/Notification/MySnackbarContent";

class RootCauseResult extends Component {
  constructor() {
    super();
    this.state = {
      newCaseName: "",
      saveAsClicked: false,
      selectedRow: [],
      selectedAll: false,
      selectedLoops: []
    };
  }
  saveClicked = () => {
    console.log("SelectedCase", this.props.SelectedCase);
    const Rca = {
      Case: this.props.SelectedCase,
      UnitName: this.props.SelectedUnit,
      RootCauses: this.props.RootCauses,
      StartTime: this.props.TimeRanges[0],
      EndTime: this.props.TimeRanges[1]
    };

    this.props.dispatch(saveRootCause(Rca));
  };
  saveCaseinSaveAsClicked = (caseName, Description) => {
    const loops = this.props.SelectedLoops.map(e => e.LoopName);
    const Newcase = {
      CaseId: "",
      CaseName: caseName,
      Description: Description,
      LoopsList: _.join(loops, ",")
    };
    const Rca = {
      Case: Newcase,
      UnitName: this.props.SelectedUnit,
      RootCauses: this.props.RootCauses,
      StartTime: this.props.TimeRanges[0],
      EndTime: this.props.TimeRanges[1]
    };

    this.props.dispatch(saveRootCause(Rca));
    this.props.dispatch(SaveAsClicked(false));
    this.setState({ newCaseName: caseName });
  };
  saveAsClicked = () => {
    this.props.dispatch(SaveAsClicked(true));
  };
  renderTable = () => {
    const rootcauses = this.props.RootCauses.filter(
      e => e.MethodName === "CausalRelation"
    );

    return (
      <>
        {this.renderModal()}
        {this.renderRootCauseTable(rootcauses)}
        {this.renderNotification()}
      </>
    );
  };
  renderModal = () => {
    return this.props.SaveAsClicked ? (
      <CaseSaveAs saveClicked={this.saveCaseinSaveAsClicked} />
    ) : (
      <></>
    );
  };
  renderRootCauseTable = rootcauses => {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <DataTable data={rootcauses} metaKeySelection={false}>
              <DataTable.Column
                field="Name"
                header="Clusters"
                sortable={true}
              />
              <DataTable.Column
                field="SourceLoops"
                header="Probable Source Loops"
                sortable={true}
              />

              <DataTable.Column
                field="ExclusionLoops"
                header="Excluded Contributors"
                sortable={true}
              />
              <DataTable.Column
                field="OriginalContributors"
                header="Original Contributors"
                sortable={true}
              />

              <DataTable.Column
                field="OscilationPeriod"
                header="Period, Min"
                sortable={true}
              />
              <DataTable.Column
                field="Confidence"
                header="Confidence"
                sortable={true}
              />
            </DataTable>
          </div>
          {this.renderButtons()}
        </div>
      </>
    );
  };
  renderButtons = () => {
    return (
      <div>
        {this.props.SelectedCase.CaseName !== "DefaultCase" ? (
          <Button
            type="primary"
            size="medium"
            content="Save"
            onClick={() => this.saveClicked()}
            className="SaveButton"
          />
        ) : (
          <></>
        )}
        <span />

        <Button
          type="primary"
          size="medium"
          content="Save As"
          onClick={() => this.saveAsClicked()}
          className="SaveButton"
        />
      </div>
    );
  };
  renderNotification = () => {
    const Message = `Case ${this.state.newCaseName} successfully saved`;
    if (this.props.SaveStatus)
      return <SnackBarNotification Message={Message} />;
  };
  render() {
    return this.LoadRootCause();
  }

  LoadRootCause = () => {
    return this.props.Loading ? this.renderProgressBar() : this.renderTable();
  };

  renderProgressBar = () => {
    return <CircularProgress />;
  };
  componentDidMount() {
    this.props.dispatch(getRootCause(this.props.SelectedCluster));
    this.props.dispatch(ToggleTimeControl(false));
  }
}

function mapStateToProps(state) {
  return {
    SelectedCluster: state.SelectedCluster,
    RootCauses: state.RootCauses,
    Loading: state.IdentifyRootCauseLoading,
    SelectedCase: state.SelectedCase,
    SelectedUnit: state.SelectedUnit,
    TimeRanges: state.TimeRanges,
    SaveAsClicked: state.SaveAsClicked,
    SaveStatus: state.SaveRCAStatus,
    SelectedLoops: state.SelectedLoops
  };
}
RootCauseResult.propTypes = {
  SelectedCluster: PropTypes.array.isRequired,
  RootCauses: PropTypes.array,
  SelectedUnit: PropTypes.string,
  SelectedCase: PropTypes.object,
  TimeRanges: PropTypes.array,
  Loading: PropTypes.bool.isRequired,
  SaveAsClicked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  SaveStatus: PropTypes.bool,
  SelectedLoops: PropTypes.array
};
export default connect(mapStateToProps)(RootCauseResult);
