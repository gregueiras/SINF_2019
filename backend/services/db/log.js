import axios from 'axios';


export const storeLog = ({ state, description, process_id, createdDoc }) => axios.post('http://0.0.0.0:3335/log', {
  state,
  description,
  process_id,
  createdDoc,
});

export const updateStateLog = ({ state, description, process_id }) => axios.post('http://0.0.0.0:3335/log/updateState', {
  state,
  id
});
