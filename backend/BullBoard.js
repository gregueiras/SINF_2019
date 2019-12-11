import BullBoard from 'bull-board';
import Queue from './lib/Queue';

require('dotenv').config();
const app = require('express')();


BullBoard.setQueues(Queue.queues.map((queue) => queue.bull));

const url = '/';
const port = process.env.BULL_BOARD_PORT;

app.use(url, BullBoard.UI);
app.listen(port, () => {
  console.log(`BullBoard running on http://localhost:${port}${url}`);
});
