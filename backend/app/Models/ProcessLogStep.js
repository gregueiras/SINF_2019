
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class ProcessLogStep extends Model {
  action() {
    return this.hasOne('App/Models/Action');
  }

  trigger() {
    return this.hasOne("App/Models/Trigger");
  }  
}

module.exports = ProcessLogStep;
