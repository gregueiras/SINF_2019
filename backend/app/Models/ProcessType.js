
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class ProcessType extends Model {


    processes() {
        return this.hasMany('App/Model/Process');
    }

    steps() {
        return this.hasMany('App/Model/Process');
    }

}

module.exports = ProcessType;
