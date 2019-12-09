'use strict'

const Step = use('App/Models/Step')
const Database = use('Database')

class StepController {

    async index() {
        return Step.all();
    }

    async createStep({request}, response) {


        const body = request.post();
        const { action_id, flow, step, trigger_id} = body; 

        const newStep = new Step();
        newStep.step_no = step;
        newStep.action_id = action_id;
        newStep.trigger_id = trigger_id;

        await newStep.save();

        return newStep.id;
    }

    async checkForCopy({request,response}){
        const {params} = request;
        const {step, action_id, trigger_id} = params;
        console.log(step);
        console.log(action_id);
        console.log(trigger_id);


        const result = await Database.select('id').from('steps')
        .where('step_no', step).andWhere('action_id', action_id).andWhere('trigger_id', trigger_id).first();
        

        console.log(result);

        if(typeof result == 'undefined'){
            response.ok("Not Found");
        }else{
            const {id} = result;
            response.ok(id);
        }
    }

}

module.exports = StepController;