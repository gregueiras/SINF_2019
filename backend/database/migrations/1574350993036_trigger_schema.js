'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TriggerSchema extends Schema {
  up () {
    this.create('triggers', (table) => {
      table.increments()
      table.string('description', 256)
      table.string('type',256);
      table.timestamps()
    })
  }

  down () {
    this.drop('triggers')
  }
}

module.exports = TriggerSchema
