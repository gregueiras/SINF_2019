import Queue from "../../../lib/Queue";
 

class TestController {
  async index({ request, response, view }) {
    await Queue.add('Test', { data: "payload" });
    console.log("Added")
    return 'hey';
  }

}

module.exports = TestController;
