import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import ActionStepper from "./components/actionstepper/ActionStepper";
import TimeControl from "./components/TimeControl/TimeControl";
import StepperBody from "./components/StepperBody/StepperBody";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="fixedDiv">
          <div className="col-md-12 timeCtrl">
            <TimeControl />
          </div>
          <div className="col-md-12">
            <div>
              <ActionStepper />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 stepperBodyMain">
          <StepperBody />
        </div>
      </div>
    </div>
  );
}

export default App;
