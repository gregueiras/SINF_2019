'use strict'

const Step = use('App/Models/Step')
const Database = use('Database')

class StepController {

    async index() {
        return Step.all();
    }

    async createStep({request}, response) {

        console.log("shit1");

        const body = request.post();
        const { action, flow, step, trigger} = body; 

        let trigger_id, action_id;

        ({id: trigger_id} = await Database.select('id').from('triggers').where('description', trigger).first());
        ({id: action_id} = await Database.select('id').from('actions').where('description', action).first());
        console.log("Here" + trigger_id + "," + action_id);

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

        const {rows} = await Step.query()
        .where({step_no: step},{action: action_id},{trigger: trigger_id})
        .fetch()

        console.log(rows);

        if(rows.length !== 0){
            response.found();
        }else
            response.ok();
    }

}

module.exports = StepController;