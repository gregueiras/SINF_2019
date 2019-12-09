const Action = use("App/Models/Action");
const Database = use('Database')

class ActionController {

    async index() {
        return Action.all();
    }


    async getIdByDescription(request) {
        const { params } = request;
        const { description } = params;
        const { id } = await Database
            .select('id')
            .from('actions')
            .where('description', description).first();
        return id;
    }
};

module.exports = ActionController;