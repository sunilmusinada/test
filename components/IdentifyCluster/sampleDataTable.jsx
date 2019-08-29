import { DataTable } from "@scuf/datatable";
import React from "react";
const data = [
  { plane: "s-1", pilot: "AAron Davis", status: "Retired", flights: 2 },
  { plane: "f-1", pilot: "Garven Dresis", status: "Retired", flights: 10 },
  { plane: "6-t", pilot: "David JP", status: "Retired", flights: 9 }
];

class SampleDataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedRow: null,
      selectedAll: false
    };
  }

  render() {
    return (
      <>
        <DataTable
          data={data}
          selection={this.state.selectedRow}
          selectionMode="single"
          onSelectionChange={e => this.setState({ selectedRow: e })}
          metaKeySelection={false}
        >
          <DataTable.Column field="plane" header="Plane" sortable={true} />
          <DataTable.Column field="pilot" header="Pilot" />
          <DataTable.Column field="status" header="Status" />
          <DataTable.Column field="flights" header="Flights" />
        </DataTable>
      </>
    );
  }
}
export default SampleDataTable;
