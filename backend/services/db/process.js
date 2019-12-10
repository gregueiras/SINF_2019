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
