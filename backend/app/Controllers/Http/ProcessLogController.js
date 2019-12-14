"use strict";

const ProcessLog = use("App/Models/ProcessLog");
const ProcessLogStep = use("App/Models/ProcessLogStep");
const ProcType = use("App/Models/ProcessType");

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

  async index({ request }) {
    const { params } = request;
    const { companyA, companyB } = params;
    const processLogs = await ProcessLog.all();
    const types = await ProcType.all();
    let logs;
    if (processLogs !== undefined) {
      logs = processLogs.rows.filter(
        log => log.company_a === companyA && log.company_b === companyB
      );
      for (const log of logs) {
        let logSteps;
    
        log.process_type_name = types.rows.filter(el => el.id == log.process_type)[0].type;
        
        log.overview_process = log.process_type_name + "-" + log.id;
        try {
          logSteps = (
            await ProcessLogStep.query()
              .where({
                process_log_id: log.id
              })
              .fetch()
          ).toJSON();

          const pending = logSteps.some(el => el.state === "Pending");
          const failed = logSteps.some(el => el.state === "Failed");

          if (failed) log.state = "Failed";
          else {
            if (pending) log.state = "Pending";
            else log.state = "Complete";
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    return logs;
  }
}

module.exports = ProcessLogController;
