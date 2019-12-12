'use strict'

const Trigger = use('App/Models/Trigger');
const Database = use('Database');

class TriggerController {

    async index() {
        return Trigger.all();
    }

    async getById(request){
        const { params } = request;
        let { id } = params;
      


        return await Database
            .select('*')
            .from('triggers')
            .where('id', id).first();
    }

    async getIdByDescription(request) {
        const { params } = request;
        let { description } = params;
        const newDescription = decodeURI(description);


        const { id } = await Database
            .select('id')
            .from('triggers')
            .where('description', newDescription).first();
        return id;
    }
};

module.exports = TriggerController;