"use strict";

const ProcessLog = use("App/Models/ProcessLog");
const ProcessLogStep = use("App/Models/ProcessLogStep");
const ProcType = use("App/Models/ProcessType");
const Step = use("App/Models/Step");
const Action = use("App/Models/Action");
const Trigger = use("App/Models/Trigger");
const Company = use("App/Models/Company");


class ProcessLogController {

  async index({ request }) {
    const { params } = request;
    const { companyA, companyB } = params;
    const processLogs = await ProcessLog.all();
    const types = await ProcType.all();

    let logs;
    if (processLogs !== undefined) {
      logs = processLogs.rows.filter(
        log => (log.company_a === companyA && log.company_b === companyB) ||
        (log.company_a === companyB && log.company_b === companyA)
      );
      for (const log of logs) {
        let logSteps;

        log.process_type_name = types.rows.filter(
          el => el.id == log.process_type
        )[0].type;

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
          const stopped = logSteps.some(el => el.state === "Stopped");

          if (failed) log.state = "Failed";
          else {
            if(stopped) {
              log.state = "Stopped";
            } else {
              if (pending) log.state = "Pending";
              else log.state = "Completed";
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    return logs;
  }

  async getLog({ request }, response) {
    const { params } = request;
    const { id } = params;
    const processLogs = await ProcessLog.all();
    const actions = await Action.all();
    const triggers = await Trigger.all();
    const types = await ProcType.all();
    const companies = await Company.all();

    const processLog = processLogs.rows.find(el => el.id == id);
    if (processLog == undefined) return response.status(400);

    try {

      processLog.process_type_name = types.rows.find(
        el => el.id == processLog.process_type
      ).type;

      processLog.company_a_name = companies.rows.find(el => el.id == processLog.company_a).name;
      processLog.company_b_name = companies.rows.find(el => el.id == processLog.company_b).name;

      const logSteps = (
        await ProcessLogStep.query()
          .where({
            process_log_id: processLog.id
          })
          .fetch()
      ).toJSON();

      const steps = (
        await Step.query()
          .where({
            process_type_id: processLog.process_type
          })
          .fetch()
      ).toJSON();

      for(const step of steps){
        const correspondingStep = logSteps.find(el => el.step_no == step.step_no);
        step.state = correspondingStep.state;
        const action = actions.rows.find(el => el.id == step.action_id);
        step.action_description = action.description;
        const trigger = triggers.rows.find(el => el.id == step.trigger_id);
        step.trigger_description = trigger.description;
      }
      processLog.steps = steps;
    } catch (e) {
      console.log(e);
    }

    return processLog;
  }
}

module.exports = ProcessLogController;
