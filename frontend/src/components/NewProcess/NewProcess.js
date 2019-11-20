import React, { Component } from "react";
import ReactTable from "react-table";
import { Container, Form } from "react-bootstrap";

import "react-table/react-table.css";

export class Overview extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          select: "Purchase Rugs - PP781763",
          id: "IHA250526",
          description: "IRAN HAMADAN",
          assortment: "RUGS",
          entity: "0001"
        },
        {
          select: "Purchase Rugs - PP781763",
          id: "IHA250526",
          description: "IRAN HAMADAN",
          assortment: "RUGS",
          entity: "0001"
        },
        {
          select: "Purchase Rugs - PP781763",
          id: "IHA250526",
          description: "IRAN HAMADAN",
          assortment: "RUGS",
          entity: "0001"
        },
        {
          select: "Purchase Rugs - PP781763",
          id: "IHA250526",
          description: "IRAN HAMADAN",
          assortment: "RUGS",
          entity: "0001"
        }
      ]
    };
  }
  render() {
    const { data } = this.state;
    return (
      <Container>
        <div className="reactTable">
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Select",
                Cell: () => (
                  <div>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" />
                    </Form.Group>
                  </div>
                )
              },
              {
                Header: "ID",
                accessor: "id"
              },
              {
                Header: "Description",
                accessor: "description"
              },
              {
                Header: "Assortment",
                accessor: "assortment"
              },
              {
                Header: "Entity",
                accessor: "entity"
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </Container>
    );
  }
}

export default Overview;
