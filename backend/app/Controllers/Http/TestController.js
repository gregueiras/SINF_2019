// import Queue from '../../../lib/Queue';
import { getSalesOrders } from '../../../services/jasmin';

const TestController = {
  // eslint-disable-next-line no-unused-vars
  async index({ request, response, view }) {
    // await Queue.add('Test', { data: 'payload' });

    const sO = await getSalesOrders();
    return sO.data;
  },
};

module.exports = TestController;
