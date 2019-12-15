import axios from "axios";

export const isMyTurn = async ({ processID, step }) => {
  const req = await axios.post(`http://0.0.0.0:3335/process/steps/current`, {
    processID,
    step
  });

  const { data } = req;

  return data;
};

export const nextTurn = async ({ processID }) => {
  const req = await axios.post(`http://0.0.0.0:3335/process/steps/next`, {
    processID
  });

  const { data } = req;
  return data;
};

export const getSeries = async ({ processID }) => {
  const req = await axios.get(`http://0.0.0.0:3335/process/series/${processID}`);

  const { data } = req;

  return data;
}

export const setFailedStep = async ({ processID }) => {
  const req = await axios.put(`http://0.0.0.0:3335/process/logs`, {
    processID,
    state:"Failed",
  });
  const { data } = req;
  return data;
}

export const setStoppedStep = async ({ processID }) => {
  const req = await axios.put(`http://0.0.0.0:3335/process/logs`, {
    processID,
    state:"Stopped",
  });
  const { data } = req;
  return data;
}

export const setCompletedStep = async ({ processID }) => {
  const req = await axios.post(`http://0.0.0.0:3335/process/logs`, {
    processID,
    state:"Completed",
  });
  const { data } = req;
  return data;
}

