'use strict'

const User = use('App/Models/User');
const Process = use("App/Models/Process");
const ProcessType = use("App/Models/ProcessType");

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
}

module.exports = ProcessController
