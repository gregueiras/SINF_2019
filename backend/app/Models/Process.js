
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class Process extends Model {


    logs(){
        return this.hasMany('App/Model/Log');
      }

}

module.exports = Process;
