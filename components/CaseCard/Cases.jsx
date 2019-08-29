import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCasesforUnit,
  ToggleTimeControl,
  setSelectedCase
} from "../../redux/actions/actions";
import CaseCard from "./casecard";
import _ from "lodash";
import "./Cases.css";
import { setSelectedTab, setSelectedLoops } from "../../redux/actions/actions";
import DefineCase from "../Case/DefineCase";
import Showcase from "../Case/Showcase";
class Cases extends Component {
  state = {
    selectedCase: "",
    isCaseSelected: false,
    selectedCard: ""
  };
  componentDidMount() {
    console.log("cdm in cases");
    this.props.dispatch(ToggleTimeControl(true));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.SelectedUnit === this.props.selectedUnit ? false : true;
  }
  editClicked = (selectedCase, rowIndex) => {
    if (selectedCase === this.state.selectedCase) {
      this.props.dispatch(setSelectedCase(""));
      this.setState({
        isCaseSelected: false,
        selectedCase: "",
        selectedCard: ""
      });
      return;
    }
    let selectedLoops = [];
    if (selectedCase.CaseName === "DefaultCase") {
      this.props.dispatch(setSelectedCase(selectedCase));
      selectedLoops = this.props.HierarchyLoops.map(e => e.LoopName);
    } else {
      selectedLoops = selectedCase.LoopsList.split(",");
    }
    console.log(selectedLoops);
    this.props.dispatch(setSelectedLoops(selectedLoops));
    this.props.dispatch(setSelectedCase(selectedCase));
    this.setState({
      selectedCase: selectedCase,
      isCaseSelected: true,
      selectedCard: `${this.props.selectedUnit} + ${rowIndex}`
    });
  };
  rerunClicked = (selectedCase, rowIndex) => {
    console.log(selectedCase);
    const selectedLoops = selectedCase.LoopsList.split(",");
    console.log(selectedLoops);
    this.props.dispatch(setSelectedCase(selectedCase));
    this.props.dispatch(setSelectedLoops(selectedLoops));
    this.props.dispatch(setSelectedTab("Identify Cluster"));
  };
  deleteClicked = selectedCase => {};
  checkSelectedCaseisSame = CaseId => {
    if (CaseId === this.state.selectedCase.CaseId) return <DefineCase />;
    else return <></>;
  };
  render() {
    const unit = this.props.selectedUnit;
    if (unit === "") return <></>;
    const cases = _.orderBy(this.props.cases, ["CaseName"], ["asc"]);

    if (cases === undefined || cases.length === 0) return <></>;
    const chunkCases = _.chunk(cases, 4);
    return (
      <div className="">
        {chunkCases.map((chunk, index) => (
          <div key={index} className="row">
            {chunk.map(cs => (
              <div
                key={cs.CaseId}
                className="row card col-md-3 col-lg-3 col-sm-2"
              >
                <CaseCard
                  case={cs}
                  rerunClicked={this.rerunClicked}
                  editClicked={this.editClicked}
                  deleteClicked={this.deleteClicked}
                  rowIndex={index}
                />
                {/* {cs.CaseId === this.state.selectedCase.CaseId ? (
                  <div className="col-12">
                    <DefineCase />
                  </div>
                ) : (
                  <></>
                )} */}
              </div>
            ))}
            <div className="row" key={index} />
            {this.state.selectedCard ===
            `${this.props.selectedUnit} + ${index}` ? (
              <div className="col-12">
                <Showcase />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedUnit: state.SelectedUnit,
    cases: state.Cases,
    HierarchyLoops: state.HierarchyLoops
  };
}
Cases.propTypes = {
  selectedUnit: PropTypes.string.isRequired,
  cases: PropTypes.array.isRequired,
  HierarchyLoops: PropTypes.array
};
export default connect(mapStateToProps)(Cases);
