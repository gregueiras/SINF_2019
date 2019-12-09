'use strict'

const Trigger = use('App/Models/Trigger');
const Database = use('Database');

class TriggerController {

    async index() {
        return Trigger.all();
    }

    async getIdByDescription(request) {
        const { params } = request;
        const { description } = params;
        const { id } = await Database
            .select('id')
            .from('triggers')
            .where('description', description).first();
        return id;
    }
};

module.exports = TriggerController;