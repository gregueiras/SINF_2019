import React, { useState } from "react";
import ReactTable from "react-table";
import { Container, Form } from "react-bootstrap";

import "react-table/react-table.css";

function NewProcess() {
  const [data, setData] = useState([
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
  ]);
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

export default NewProcess;
