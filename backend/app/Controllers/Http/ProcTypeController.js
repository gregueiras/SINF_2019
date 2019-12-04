'use strict'

const Proc_Type = use('App/Models/ProcessType')


class ProcTypeController{

    async index() {
        return Proc_Type.all();
    }


    async getByName(request, response){
        return Proc_Type.select('*').from('process_types').where('params.name',request.only(['name']));
    }
};

module.exports =  ProcTypeController;