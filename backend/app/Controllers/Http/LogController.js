'use strict'

const Log = use('App/Models/Log');
const Process = use("App/Models/Process");
const Database = use('Database');

class LogController {

  async index() {
    const logs = await Log.all();
    const processes = await Process.all();

    logs.rows.map((log) => {
      let { process_id } = log;
      processes.rows.map((process) => {
        if (process.id == process_id) {
          log.descriptionProcess = process.description;
        }
      });
    });


    return logs;
  }

  async getProc(res) {
    console.log("GET PROC " + res);
    this.curr = res;

  }



  async getById(request, response) {
    const { params } = request;
    const { id } = params;
    return await Database
      .table('logs')
      .select('*')
      .from('logs')
      .where('id', id);
  }

  async getByState(request, response) {
    const { params } = request;
    const { state } = params;
    return Database
      .table('logs')
      .select('*')
      .from('logs')
      .where('state', state);
  }

  async getByProcId(request, response) {
    const { params } = request;
    const { process_id } = params;
    return Database
      .table('logs')
      .select('*')
      .from('logs')
      .where('process_id', process_id);
  }

  async getByDate(request, response) {
    const { params } = request;
    const { begin_date, end_date } = params;
    return Database
      .table('logs')
      .select('*')
      .from('logs')
      .whereBetween('date', begin_date, end_date);

  }

  /*One of these is redundant either use createLog or store*/
  async createLog({ request }) {
    const body = request.post();
    const { state, description, date, process_id } = body;
    return await Database.table('logs')
      .insert({
        state: state,
        description: description,
        date: date,
        process_id: process_id
      });
  }


  async store({ request }) {
    const body = request.post();
    const { state, description, date, process_id } = body;

    //console.log(body);

    const process = await Process.find(process_id);

    return await process.logs().create({
      state,
      description,
      date
    });
  }


  async updateState({ request }) {


    const body = request.post();
    const { id, new_state } = body;
    console.log(new_state);
    const affectedRows = Database
      .table('logs')
      .where('id', id)
      .update('state', new_state);
    return affectedRows;

  }
};

module.exports = LogController;