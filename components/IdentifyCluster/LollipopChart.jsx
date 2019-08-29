import React, { Component } from "react";

import LollipopPlot from "react-mutation-plot";
const mockData = {
  vizHeight: 100, // hardcoded
  vizWidth: 500 // hardcoded
};
const options = {
  displayDomainLabel: false,
  displayLegend: false,
  exportToPDF: false
};

const LollipopChart = props => {
  return (
    <LollipopPlot
      lollipops={props.graphData}
      vizWidth={mockData.vizWidth}
      vizHeight={mockData.vizHeight}
      hugoGeneSymbol={props.LoopName}
      xMax={props.xMax}
      yMax={props.yMax}
      options={options}
    />
  );
};

export default LollipopChart;
