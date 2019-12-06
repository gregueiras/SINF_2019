import React, { useState,Component } from 'react';
import ReactTable from 'react-table';
import { Container } from 'react-bootstrap';
import setIcon from '../../Utilities/SetIcon';
import { withRouter } from 'react-router-dom';

import LogService from '../../services/LogService';

class Logs extends Component {

 constructor(props) {
  super(props);
  this.state = { data: [
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
  ]};
  this.LogService = new LogService();
 }

 componentDidMount() {
  this.LogService.getLogs((response) => {
    /*const reverse = response.data.slice().reverse();
    const logs = reverse.map((data) => (
      {
        process: data.process,
        state: data.state,
        description: data.description,
        timestamp: data.date,
      }

    ));
    const newState = { data: logs };
    this.setState(newState);*/
  });
}
 render(){
   const {data}= this.state;
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
}

export default withRouter(Logs);
