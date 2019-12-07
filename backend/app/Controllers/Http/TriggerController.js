'use strict'

const Trigger = use('App/Models/Trigger');

class TriggerController {

    async index() {
        return Trigger.all();
    }
};

module.exports = TriggerController;