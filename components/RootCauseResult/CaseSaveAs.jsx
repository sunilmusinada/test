import React, { Component } from "react";
import { Modal, Button } from "@scuf/common";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SaveAsClicked } from "../../redux/actions/actions";
import "../RootCauseResult/Rootcause.css";
import { Input } from "@scuf/common";
class CaseSaveAs extends Component {
  state = {
    caseName: "",
    Description: ""
  };
  onNameChange = data => {
    this.setState({ caseName: data });
  };
  onDescriptionChange = data => {
    this.setState({ Description: data });
  };

  render() {
    return (
      <Modal
        className="popup-theme-wrap"
        onClose={() => this.props.dispatch(SaveAsClicked(false))}
        size="medium"
        open={this.props.SaveAsClicked}
        className="SaveAsModal"
      >
        <Modal.Header>
          <h1>Save Case as</h1>
        </Modal.Header>
        <Modal.Content>
          <div className="row">
            <div className="col-md-10 col-sm-10 col-lg-10 col-md-offset-1">
              <div>
                <Input
                  placeholder="Case name"
                  onChange={data => {
                    this.onNameChange(data);
                  }}
                  label="Case Name"
                  fluid={true}
                />
              </div>
              <div>
                <Input
                  placeholder="Description"
                  onChange={data => {
                    this.onDescriptionChange(data);
                  }}
                  label="Description"
                  fluid={true}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button
            type="primary"
            size="small"
            content="save"
            onClick={() =>
              this.props.saveClicked(
                this.state.caseName,
                this.state.Description
              )
            }
          />
          <Button
            type="primary"
            size="small"
            content="Close"
            onClick={() => this.props.dispatch(SaveAsClicked(false))}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    SaveAsClicked: state.SaveAsClicked
  };
}
CaseSaveAs.propTypes = {
  SaveAsClicked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(CaseSaveAs);
