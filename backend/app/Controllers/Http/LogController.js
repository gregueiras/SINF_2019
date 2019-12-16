'use strict'

const Log = use('App/Models/Log');
const Process = use("App/Models/Process");
const Database = use('Database');
const ProcType = use('App/Models/ProcessType')

class LogController {

  async index() {
    const logs = await Log.all();
    const processes = await Process.all();
    const types = await ProcType.all();
    if (logs !== undefined) {
      logs.rows.map((log) => {
        let { process_id } = log;
        processes.rows.map((process) => {
          if (process.id == process_id) {
            log.descriptionProcess = process.description;
            types.rows.map((type) => {
              if(type.id == process.process_type){
                log.processType = type.type;
              }
            })
          }
        });
      });
    }


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
    const { state, description, process_id, createdDoc } = body;
    const processes = await Process.all();
    const process = processes.rows.find(el => el.id == process_id);
    const log = new Log();
    log.state = state;
    log.description = description;
    log.date = Database.fn.now();
    log.process_id = process_id;
    log.process_log_id = process.current_log;
    log.doc = createdDoc;
    await log.save();
    return log.toJSON().id;
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


  async updateLogState({ request }) {
    console.log('here1');
    const body = request.post();
    const { id, state } = body;
    console.log("state: " + state);
    const log = await Log.find(id);
    log.state = state;
    return await log.save();
  }

  async getProcesses(request) {
    const { params } = request;
    const { companyA, companyB } = params;
    const data =
      (await Process.query()
        .where({
          company_a: companyA,
          company_b: companyB
        })
        .fetch()).toJSON();

    const logs = await Log.all();
    let logsBetween2Companies = [];
    if (data[0] !== undefined) {
      logs.rows.map((log) => {

        if (log.process_id == data[0].id) {
          logsBetween2Companies.push(log);
        }
      });
    }
    return logsBetween2Companies;
  }
};



module.exports = LogController;