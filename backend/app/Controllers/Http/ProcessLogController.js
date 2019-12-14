'use strict'

const ProcessLog = use('App/Models/ProcessLog');
const Process = use("App/Models/Process");
const Database = use('Database');
const ProcType = use('App/Models/ProcessType')

class ProcessLogController {

  /*async index() {
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
  }*/

  async createLog() {
    const log = new Log();
    await log.save();
    return log.toJSON().id;
  }

 
};



module.exports = ProcessLogController;