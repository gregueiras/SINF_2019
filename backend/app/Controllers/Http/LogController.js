'use strict'

const Log = use('App/Models/Log');
const Process = use("App/Models/Process");

class LogController {
  async index() {
    return Log.all();
  }

  async store({ request }) {
    const body = request.post();
    const { state, description, date, process_id } = body;

    console.log(body);

    const process = await Process.find(process_id);

    return await process.logs().create({
      state,
      description,
      date
    });
  }
}

module.exports = LogController
