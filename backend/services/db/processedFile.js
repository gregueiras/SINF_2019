import axios from 'axios';

export const isProcessed = async ({ userID, fileID }) => {
  const req = await axios.get('http://0.0.0.0:3335/processedFile', {
    data: {
      userID,
      fileID,
    },
  });

  const { data } = req;

  return data;
};

export const addProcessed = ({ userID, fileID }) => axios.post('http://0.0.0.0:3335/processedFile', {
  userID,
  fileID,
});
