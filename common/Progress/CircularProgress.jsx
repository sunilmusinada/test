import { Progress } from "@scuf/common";
import React, { Component } from "react";
class CircularProgress extends Component {
  state = { percent: 0 };
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-5">
          <Progress circular={true} size="small" />
        </div>
      </div>
    );
  }
}

export default CircularProgress;
