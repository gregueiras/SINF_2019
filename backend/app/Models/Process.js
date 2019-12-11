
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class Process extends Model {

    user() {
        return this.belongsTo('App/Models/User');
    }

    type() {
        return this.hasOne('App/Models/ProcessType');
    }

    logs() {
        return this.hasMany('App/Models/Log');
    }

    steps() {
        return this.hasMany('App/Models/Step');
    }

}

module.exports = Process;
