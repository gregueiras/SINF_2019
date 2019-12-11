'use strict'

const ProcessStep = use('App/Models/ProcessStep')


class ProcessStepController {
    
    async index(){
        return ProcessStep.all();
    }

    async createProcessStep({request}, response){
        const body = request.post();
        const {proc_type_id, step_id} = body;

        const newProcStep = new ProcessStep();

        newProcStep.process_id = proc_type_id;
        newProcStep.step_id = step_id;

        await newProcStep.save();

        return newProcStep.id;
    }
}

module.exports = ProcessStepController;