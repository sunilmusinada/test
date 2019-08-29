import { Card, Divider, Icon, Tooltip } from "@scuf/common";
import React, { Component } from "react";
import "./Cases.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Temp from "./temp";

class CaseCard extends Component {
  state = {
    show: false
  };

  render() {
    const currentCase = this.props.case;
    const reRunClicked = this.props.rerunClicked;
    const editClicked = this.props.editClicked;
    const deleteClicked = this.props.deleteClicked;
    const RowIndex = this.props.rowIndex;
    const LastRunTime = `Last run time ${currentCase.LastRunTime}`;
    return (
      <div>
        <Card>
          <Card.Header title={currentCase.CaseName} />
          <Card.Meta subtitle={LastRunTime} />
          <Card.Content>
            {currentCase.Description}
            <Divider />
            <div align="right">
              <Tooltip
                element={
                  <a href="#">
                    <Icon
                      name="document"
                      size="medium"
                      color="black"
                      onClick={() => editClicked(currentCase, RowIndex)}
                    />
                  </a>
                }
                content="Edit case"
                position="top right"
              />

              <span />
              {currentCase.CaseName !== "DefaultCase" ? (
                <a href="#">
                  <Icon
                    name="redo"
                    size="medium"
                    color="black"
                    onClick={() => reRunClicked(currentCase, RowIndex)}
                  />
                </a>
              ) : (
                <></>
              )}
              <span />

              <a href="#">
                <Icon
                  name="delete"
                  size="medium"
                  color="black"
                  onClick={() => deleteClicked(currentCase, RowIndex)}
                />
              </a>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
CaseCard.propTypes = {
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(CaseCard);
