'use strict'

const ProcType = use('App/Models/ProcessType')
const Database = use('Database');

class ProcTypeController {

    async index() {
        return ProcType.all();
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