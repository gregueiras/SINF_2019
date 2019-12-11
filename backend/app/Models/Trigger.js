/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Trigger extends Model {
  step() {
    return this.belongsTo("App/Models/Step");
  }
}

module.exports = Trigger;
