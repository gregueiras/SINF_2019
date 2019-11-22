require("dotenv").config();
import BullBoard from "bull-board";
import Queue from './lib/Queue'
const app = require("express")();


BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

const url = "/";
const port = process.env.BULL_BOARD_PORT;

app.use(url, BullBoard.UI);
app.listen(port, function() {
  console.log(`BullBoard running on http://localhost:${port}${url}`);
});
