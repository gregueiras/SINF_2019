import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Container } from 'react-bootstrap';
import setIcon from '../../Utilities/SetIcon';
import {Link, withRouter } from 'react-router-dom';

import LogService from '../../services/LogService';

class Logs extends Component {

 constructor(props) {
  super(props);
  this.state = { data: [
  ]};
  this.LogService = new LogService();
 }

 componentDidMount() {
  this.LogService.getLogs((response) => {
    if(response.status === 200){
      const reverse = response.data.slice().reverse();
  
      console.log(reverse);
      const logs = reverse.map((data) => (
        {
          process: data.descriptionProcess,
          state: data.state,
          description: data.description + (data.doc === "none" ? "" : "-" + data.doc),
          timestamp: data.created_at,
          process_log_id: data.process_log_id,
          processType: data.processType + "-" + data.process_log_id,
        }
  
      ));
      const newState = { data: logs };
      this.setState(newState);
    }
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
              accessor: 'processType',
              Cell: (value) => {
                return (
                <Link to={`/view-process/${value.original.process_log_id}`}>{value.original.processType}</Link>)
              }
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
