const Action = use("App/Models/Action");

class ActionController {

    async index() {
        return Action.all();
    }
};

module.exports = ActionController;