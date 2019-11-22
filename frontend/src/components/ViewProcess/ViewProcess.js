import React, { useState } from "react";
import ReactTable from "react-table";
import { Container } from "react-bootstrap";

function ViewProcess() {
  const [data] = useState([
    {
      step: 1,
      trigger: "Create Purchase Order",
      action: "Create Sales Order",
      flow: "A->B",
      state: "completed"
    },
    {
      step: 2,
      trigger: "Create Purchase Order",
      action: "Create Sales Order",
      flow: "A->B",
      state: "completed"
    },
    {
      step: 3,
      trigger: "Create Purchase Order",
      action: "Create Sales Order",
      flow: "A->B",
      state: "completed"
    }
  ]);

  return (
    <Container>
      <div className="reactTable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Step#",
              accessor: "step"
            },
            {
              Header: "Trigger",
              accessor: "trigger"
            },
            {
              Header: "Action",
              accessor: "action"
            },
            {
              Header: "Flow",
              accessor: "flow"
            },
            {
              Header: "State",
              accessor: "state"
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    </Container>
  );
}

export default ViewProcess;
