import React, { Component } from "react";
import ReactTable from "react-table";
import { Container, Row, Col, Button } from "react-bootstrap";

import "react-table/react-table.css";

export class Overview extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          process: "Purchase Rugs - PP781763",
          state: "Completed",
          description: "Receive Receipt",
          timestamp: "12/02/2019 19:01"
        },
        {
          process: "Purchase Rugs - PP781763",
          state: "Failed",
          description: "Receive Receipt",
          timestamp: "12/02/2019 19:01"
        },
        {
          process: "Purchase Rugs - PP781763",
          state: "Pending",
          description: "Receive Receipt",
          timestamp: "12/02/2019 19:01"
        },
        {
          process: "Purchase Rugs - PP781763",
          state: "In progress",
          description: "Receive Receipt",
          timestamp: "12/02/2019 19:01"
        }
      ],
    };
  }
  render() {
    const { data, companyAoptions, companyBoptions } = this.state;
    return (
      <Container>
        <div className="reactTable">
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Process",
                accessor: "process"
              },
              {
                Header: "State",
                accessor: "state"
              },
              {
                Header: "Description",
                accessor: "description"
              },
              {
                Header: "Timestamp",
                accessor: "timestamp"
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
}

export default Overview;
