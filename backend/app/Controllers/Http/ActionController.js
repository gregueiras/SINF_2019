const Action = use("App/Models/Action");
const Database = use('Database')

class ActionController {

    async index() {
        return Action.all();
    }


    async getById(request){
        const { params } = request;
        let { id } = params;
      


        return await Database
            .select('*')
            .from('actions')
            .where('id', id).first();
    }



    async getByTriggerId(request){
        const { params } = request;
        let { id } = params;

        return await Database
            .select('*')
            .from('actions')
            .where('id', id).orWhere('description', 'Wait');
      
    }

    async getIdByDescription(request) {
        const { params } = request;
        const { description } = params;

        //description = description.replace('%20', ' ');
        const newDescription = decodeURI(description);

        const { id } = await Database
            .select('id')
            .from('actions')
            .where('description', newDescription).first();
        return id;
    }
};

module.exports = ActionController;