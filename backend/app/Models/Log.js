
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class Log extends Model {



    process() {
        return this.belongsTo('App/Models/Process');
      }
    

}

module.exports = Log;
