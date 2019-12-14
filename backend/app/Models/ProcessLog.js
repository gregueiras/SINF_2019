
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class ProcessLog extends Model {

    steps() {
        return this.hasMany('App/Models/ProcessLogSteps');
    }

}

module.exports = ProcessLog;
