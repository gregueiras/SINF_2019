'use strict'

const Proc_Type = use('App/Models/ProcessType')
const Database = use('Database');

class ProcTypeController {

    async index() {
        return Proc_Type.all();
    }


    async getByName(request, response) {
        const { params } = request;
        const { name } = params;
        return await Database
            .select('*')
            .from('process_types')
            .where('name', name);
    }


};

module.exports = ProcTypeController;