import React, { useState } from 'react';
import ReactTable from 'react-table';
import { Container } from 'react-bootstrap';
import setIcon from '../../Utilities/SetIcon';

function Logs() {
  const [data] = useState([
    {
      process: 'Purchase Rugs - PP781763',
      state: 'Completed',
      description: 'Receive Receipt',
      timestamp: '12/02/2019 19:01',
    },
    {
      process: 'Purchase Rugs - PP781763',
      state: 'Failed',
      description: 'Receive Receipt',
      timestamp: '12/02/2019 19:01',
    },
    {
      process: 'Purchase Rugs - PP781763',
      state: 'Pending',
      description: 'Receive Receipt',
      timestamp: '12/02/2019 19:01',
    },
    {
      process: 'Purchase Rugs - PP781763',
      state: 'In progress',
      description: 'Receive Receipt',
      timestamp: '12/02/2019 19:01',
    },
  ]);

  return (
    <Container>
      <div className="reactTable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Process',
              accessor: 'process',
            },
            {
              Header: 'State',
              accessor: 'state',
              Cell: (value) => setIcon(value, false),
              width: 150,
            },
            {
              Header: 'Description',
              accessor: 'description',
            },
            {
              Header: 'Timestamp',
              accessor: 'timestamp',
            },
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    </Container>
  );
}

export default Logs;
