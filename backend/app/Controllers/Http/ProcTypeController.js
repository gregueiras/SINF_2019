'use strict'

const ProcType = use("App/Models/ProcessType");
const Step = use("App/Models/Step");
const Action = use("App/Models/Action");
const Trigger = use("App/Models/Trigger");
const Database = use('Database');

class ProcTypeController {

    async index() {
        return ProcType.all();
    }

    async getSteps({ request }) {
        const { params } = request;
        const { id } = params;
        const actions = await Action.all();
        const triggers = await Trigger.all();
        const types = await ProcType.all();
    
        const type = types.rows.find(el => el.id == id);
        if (type == undefined) return response.status(400);
    
        try {
    
          const steps = (
            await Step.query()
              .where({
                process_type_id: id
              })
              .fetch()
          ).toJSON();
    
          for(const step of steps){
            const action = actions.rows.find(el => el.id == step.action_id);
            step.action_description = action.description;
            const trigger = triggers.rows.find(el => el.id == step.trigger_id);
            step.trigger_description = trigger.description;
          }
          type.steps = steps;
        } catch (e) {
          console.log(e);
        }
    
        return type;
      }
    
   

    async getByName(request, response) {
        const { params } = request;
        const { name } = params;

        const nameSpaces = decodeURI(name);

            return await Database
            .select('*')
            .from('process_types')
            .where('type', nameSpaces);
    }

    async createProcType({request}, response) {
        const body = request.post();
        const { user, type, descriptionA, descriptionB } = body;

        

        const newProcType = new ProcType();
        newProcType.user = user;
        newProcType.type = type;
        newProcType.descriptionA = descriptionA;
        newProcType.descriptionB = descriptionB;


        await newProcType.save();

        return newProcType.id;
    }


};

module.exports = ProcTypeController;