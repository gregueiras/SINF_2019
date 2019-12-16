"use strict";
import Queue from "../../../lib/Queue";
const User = use("App/Models/User");
const Process = use("App/Models/Process");
const ProcessType = use("App/Models/ProcessType");
const Step = use("App/Models/Step");
const Trigger = use("App/Models/Trigger");
const Action = use("App/Models/Action");
const Log = use("App/Models/Log");
const ProcessLogStep = use("App/Models/ProcessLogStep");
const ProcessLog = use("App/Models/ProcessLog");
const Database = use("Database");

class ProcessController {
  async store({ request }) {
    const body = request.post();
    const { description, userID, companyA, companyB, processTypeID } = body;

    const user = await User.find(userID);
    const processType = await ProcessType.find(processTypeID);

    const process = new Process();

    process.description = description;
    process.company_a = companyA;
    process.company_b = companyB;
    process.user().associate(user);
    process.type().associate(processType);

    return await process.save();
  }

  async get({ request }) {
    const body = request.post();
    const { processID } = body;

    return await Process.find(processID);
  }

  async getSeries({ request }) {
    const { params } = request;
    const { id } = params;
    const processID = id;
    const process = await Process.find(processID);

    return process.series;
  }

  async canRun({ request }) {
    const body = request.post();
    const { processID, step } = body;

    const process = await Process.find(processID);

    return process.active_step === step;
  }

  async nextStep({ request }) {

    console.log("ENTERED IN NEXTSTEP FUNCTION -> ONLY TO ENTER WHEN STEP IS COMPLETED")
    const body = request.post();
    const { processID } = body;

    const process = await Process.find(processID);
    const processLog = await ProcessLog.find(process.current_log);
    const processLogID = processLog.id;

    const activeStep = process.active_step;
    let logStep;

    try {
      logStep = (
        await ProcessLogStep.query()
          .where({
            process_log_id: processLogID,
            step_no: activeStep,
          })
          .fetch()
      ).toJSON()[0];
    } catch (e) {
      console.log(e);
    }

    const logStepID = logStep.id;
    const updatedProcessLogStep= await ProcessLogStep.find(logStepID);
    updatedProcessLogStep.state = "Completed";
    await updatedProcessLogStep.save();


    let steps;

      try {
        steps = (
          await Step.query()
            .where({
              process_type_id: process.process_type,
            })
            .fetch()
        ).toJSON();
      } catch (e) {
        console.log(e);
      }

    let nextStep = activeStep + 1;

    console.log("NR OF STEPS: " + steps.length);
    console.log("ACTIVE STEP: " + activeStep);
    console.log("NEXT STEP: " + nextStep);

   if (nextStep > steps.length) {
     console.log("next step");
      nextStep = 1;
      const newProcessLog = new ProcessLog();
      newProcessLog.user = processLog.user;
      newProcessLog.process_type = processLog.process_type;
      newProcessLog.company_a = processLog.company_a;
      newProcessLog.company_b = processLog.company_b;
      await newProcessLog.save();
      const newProcessLogID = newProcessLog.toJSON().id;

      process.current_log = newProcessLogID;
      for (const step of steps) {
        const processLogStep = new ProcessLogStep();
        processLogStep.step_no = step.step_no;
        processLogStep.process_log_id = newProcessLogID;
        processLogStep.state = "Pending";
        await processLogStep.save();
      }
    }

    process.active_step = nextStep;

    process.save();

    return process.active_step;
  }

  async addProcess({ request }) {
    const body = request.post();
    const { processType, companyA, companyB } = body.data;
    console.log(processType);
    let steps;
    try {
      steps = (
        await Step.query()
          .where({
            process_type_id: processType
          })
          .fetch()
      ).toJSON();
    } catch (e) {
      console.log(e);
    }
    const processExist = await Process.query()
      .where({
        user: 1,
        company_a: companyA,
        company_b: companyB,
        process_type: processType
      })
      .getCount();

      console.log("PR: " + processExist);
    if (processExist == 0) {
      //adiciona um novo log ja com os steps
      const processLog = new ProcessLog();
      processLog.user = 1;
      processLog.process_type = processType;
      processLog.company_a = companyA;
      processLog.company_b = companyB;
      await processLog.save();
      const processLogID = processLog.toJSON().id;


      const getProcessType = await ProcessType.findOrFail(processType);
      let processTypeJob = "IC" + getProcessType.type.charAt(0) + "1";
      const lastProcessId = await Process.last();
      console.log("last process 2 " + JSON.stringify(lastProcessId));

      const process = new Process();
      process.process_type = processType;
      process.company_a = companyA;
      process.company_b = companyB;
      process.series = processTypeJob;
      process.user = 1;
      process.created_at = Database.fn.now();
      process.updated_at = Database.fn.now();
      process.series = processTypeJob;
      process.current_log = processLogID;
      await process.save();

      console.log("serie " + process.series);
      for (const step of steps) {
        const trigger = await Trigger.find(step.trigger_id);
        const action = await Action.find(step.action_id);
        const triggerType = trigger.type;
        const actionType = action.type;
        const job = triggerType + "_" + actionType;
        const jobName = job + "_" + process.id;
        console.log("job " + job + " step: " + step.step_no);
        await Queue.add(
          job,
          { companyA, companyB, processID: process.id, step: step.step_no },
          jobName
        );
        //create all the steps for the process log
        const processLogStep = new ProcessLogStep();
        processLogStep.step_no = step.step_no;
        processLogStep.process_log_id = processLogID;
        processLogStep.state = "Pending";
        processLogStep.save();
      }

      return true;
    } else return false;
  }

  async updateProcessLogStep({request}){
    const body = request.post();
    const { state, processID } = body;
    const process = await Process.find(processID);
    const processLog = await ProcessLog.find(process.current_log);
    const processLogID = processLog.id;
    const activeStep = process.active_step;
    let logStep;

    try {
      logStep = (
        await ProcessLogStep.query()
          .where({
            process_log_id: processLogID,
            step_no: activeStep,
          })
          .fetch()
      ).toJSON()[0];
    } catch (e) {
      console.log(e);
    }

    const logStepID = logStep.id;
    const updatedProcessLogStep= await ProcessLogStep.find(logStepID);
    updatedProcessLogStep.state = state;
    await updatedProcessLogStep.save();    

    if(state == "Failed" || state == "Stopped"){

      console.log("failed");
      const type = await ProcessType.find(process.process_type);
      let steps;

      try {
        steps = (
          await Step.query()
            .where({
              process_type_id: type.id
            })
            .fetch()
        ).toJSON();

        const newProcessLog = new ProcessLog();
        newProcessLog.user = processLog.user;
        newProcessLog.process_type = processLog.process_type;
        newProcessLog.company_a = processLog.company_a;
        newProcessLog.company_b = processLog.company_b;
        await newProcessLog.save();

        const newProcessLogID = newProcessLog.toJSON().id;
        process.current_log = newProcessLogID;
        await process.save();

        for (const step of steps) {
          const processLogStep = new ProcessLogStep();
          processLogStep.step_no = step.step_no;
          processLogStep.process_log_id = newProcessLogID;
          if(step.step_no < activeStep){
            processLogStep.state = "Completed";
          }else {
            processLogStep.state = "Pending";
          }
          await processLogStep.save();
        }

      } catch (e) {
        console.log(e);
      }


    }

    return logStepID;
  }
}

module.exports = ProcessController;
