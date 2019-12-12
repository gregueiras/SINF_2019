'use strict'

const Step = use('App/Models/Step')
const Database = use('Database')

class StepController {

    async index() {
        return Step.all();
    }

    async getAllFromProcessType({request},response){
        const {params} = request;
        const {process_type_id} = params;
       
        const result = await Database.select('*').from('steps')
        .where('process_type_id', process_type_id);

        return result;
    }

    async createStep({request}, response) {


        const body = request.post();
        const { action_id, flow, step, trigger_id, proc_type_id } = body; 
     

        const newStep = new Step();
        newStep.step_no = step;
        newStep.action_id = action_id;
        newStep.trigger_id = trigger_id;
        newStep.process_type_id = proc_type_id;
        newStep.flow = flow;


        await newStep.save();

        return newStep.id;
    }

    async checkForCopy({request,response}){
        const {params} = request;
        const {step, process_type_id, action_id, trigger_id} = params;
       
        const result = await Database.select('id').from('steps')
        .where('step_no', step).andWhere('action_id', action_id).andWhere('trigger_id', trigger_id).andWhere('process_type_id', process_type_id).first();
    
        if(typeof result == 'undefined'){
            response.ok("Not Found");
        }else{
            const {id} = result;
            response.ok(id);
        }
    }

}

module.exports = StepController;